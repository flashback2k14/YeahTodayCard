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
      padding: 0.25em 0.5em;
    }

    form label input {
      flex-grow: 1;
      margin-left: 16px;
      padding: 0.25em 0.5em;
      border: 1px solid #000;
      border-radius: 2px;
      font-size: medium;
    }

    form label input:hover {
      border: 1px solid rgb(29, 233, 182);
    }

    form label input:focus {
      border: 1px solid rgb(29, 233, 182);
      outline: 1px solid rgb(29, 233, 182);
    }

    form button {
      font-size: medium;
      padding: 0.5em;
      background-image: linear-gradient(45deg, rgb(83, 109, 254) 0%, rgb(106, 61, 232) 100%);
      border: none;
      color: #fff;
      border-radius: 2px;
      cursor: pointer;
    }

    form button:hover {
      box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
    }

    form button:focus {
      box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
      border: none;
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
