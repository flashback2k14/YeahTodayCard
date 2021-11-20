import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import { Router } from '@vaadin/router';

import { AuthorizationService } from '../../../auth/authorization-service';
import EventBus, { EventNames } from '../../../utils/event-bus';

@customElement('tc-login')
class TcLogin extends LitElement {
  static styles = css`
    form {
      display: flex;
      flex-direction: column;
      row-gap: 0.6em;
      width: 30vw;
    }

    form label {
      display: flex;
    }

    form label span {
      flex: none;
    }

    form label input {
      flex-grow: 1;
      margin-left: 16px;
    }

    form button {
      font-size: medium;
    }

    /* Smartphones (portrait and landscape) ----------- */
    @media only screen and (min-device-width: 320px) and (max-device-width: 480px) {
      form {
        width: 90vw;
      }
    }
  `;

  protected render() {
    return html`<form @submit=${this._submitLogin}>
      <label for="username">
        <span>Username</span>
        <input id="username" name="username" type="text" required />
      </label>
      <label for="password">
        <span>Password</span>
        <input id="password" name="password" type="password" required />
      </label>
      <button type="submit">Login</button>
    </form>`;
  }

  private _submitLogin(e: SubmitEvent): void {
    e.preventDefault();

    const formElement = e.currentTarget as HTMLFormElement;

    if (!formElement.checkValidity()) {
      console.error('invalid');
      return;
    }

    const formData = new FormData(formElement);
    const username = formData.get('username');
    const password = formData.get('password');

    AuthorizationService.setToken(btoa(`${username}:${password}`));
    EventBus.fire(EventNames.LOGGED_IN);
    Router.go('/cards');
  }
}
