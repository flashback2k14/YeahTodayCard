import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { Router } from '@vaadin/router';

import { AuthorizationService } from '../../auth/authorization-service';
import EventBus, { EventNames } from '../../utils/event-bus';

@customElement('tc-header')
class TcHeader extends LitElement {
  static styles = css`
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 48px;
    }

    header span {
      margin-left: 8px;
    }

    header img {
      margin-top: 4px;
      margin-right: 8px;
      cursor: pointer;
    }
  `;

  @state()
  private _isAuthorized = AuthorizationService.isAuthorized();

  connectedCallback() {
    super.connectedCallback();
    EventBus.register(EventNames.LOGGED_IN, this._handleLoggedIn.bind(this));
  }

  disconnectedCallback() {
    EventBus.remove(EventNames.LOGGED_IN, this._handleLoggedIn.bind(this));
    super.disconnectedCallback();
  }

  protected render() {
    return html`<header>
      <span>Yeah! today card</span>
      ${this._isAuthorized ? html`<img src="/assets/logout.svg" @click=${this._logout} />` : null}
    </header>`;
  }

  private _handleLoggedIn(): void {
    this._isAuthorized = AuthorizationService.isAuthorized();
  }

  private _logout() {
    AuthorizationService.resetToken();
    this._isAuthorized = AuthorizationService.isAuthorized();
    Router.go('/');
  }
}
