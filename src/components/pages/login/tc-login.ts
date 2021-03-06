import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { Router } from '@vaadin/router';

import { loginStyles } from '../../../styles';
import { AuthorizationService } from '../../../auth/authorization-service';
import ConfigStore from '../../../store/config.store';
import DataStore from '../../../store/data.store';

@customElement('tc-login')
export class TcLogin extends LitElement {
  static styles = loginStyles;

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

    ConfigStore.dispatch({
      type: 'HANDLE_LOGIN',
      payload: AuthorizationService.isAuthorized(),
    });

    DataStore.dispatch({
      type: 'GET',
    });

    Router.go('/cards');
  }
}
