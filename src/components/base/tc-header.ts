import { LitElement, html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { Router } from '@vaadin/router';

import { AuthorizationService } from '../../auth/authorization-service';
import EventBus, { EventNames } from '../../utils/event-bus';
import { headerStyles } from '../../styles';

@customElement('tc-header')
export class TcHeader extends LitElement {
  static styles = headerStyles;

  @state()
  private _isAuthorized = AuthorizationService.isAuthorized();

  @state()
  private _themeVariante: 'light' | 'dark' = 'light';

  connectedCallback(): void {
    super.connectedCallback();
    EventBus.register(EventNames.LOGGED_IN, this._handleLoggedIn.bind(this));
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', this._handleMediaChanges.bind(this));
    this._getTheme();
  }

  disconnectedCallback(): void {
    EventBus.remove(EventNames.LOGGED_IN, this._handleLoggedIn.bind(this));
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .removeEventListener('change', this._handleMediaChanges.bind(this));
    super.disconnectedCallback();
  }

  themeTemplate(): TemplateResult {
    return this._themeVariante === 'dark'
      ? html`<svg
          @click=${this._toggleTheme}
          title="Dark theme"
          width="24"
          height="24"
          stroke-width="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 11.5066C3 16.7497 7.25034 21 12.4934 21C16.2209 21 19.4466 18.8518 21 15.7259C12.4934 15.7259 8.27411 11.5066 8.27411 3C5.14821 4.55344 3 7.77915 3 11.5066Z"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg> `
      : html`<svg
          @click=${this._toggleTheme}
          title="Light theme"
          width="24"
          height="24"
          stroke-width="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path d="M22 12L23 12" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M12 2V1" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M12 23V22" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M20 20L19 19" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M20 4L19 5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M4 20L5 19" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M4 4L5 5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M1 12L2 12" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
        </svg> `;
  }

  logoutTemplate(): TemplateResult {
    return html`<svg
      @click=${this._logout}
      title="Logout"
      width="24"
      height="24"
      stroke-width="1.5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 12H19M19 12L16 15M19 12L16 9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
      <path
        d="M19 6V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V18"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>`;
  }

  protected render(): TemplateResult {
    return html`<header>
      <span>Yeah! today card</span>
      <div>
        ${this._isAuthorized ? this.themeTemplate() : null} ${this._isAuthorized ? this.logoutTemplate() : null}
      </div>
    </header>`;
  }

  private _handleLoggedIn(): void {
    this._isAuthorized = AuthorizationService.isAuthorized();
  }

  private _handleMediaChanges({ matches: isDark }: any): void {
    this._themeVariante = isDark ? 'dark' : 'light';
    document.body.setAttribute('data-theme', this._themeVariante);
    this._saveTheme();
  }

  private _toggleTheme(): void {
    if (this._themeVariante === 'light') {
      document.body.setAttribute('data-theme', 'dark');
      this._themeVariante = 'dark';
    } else {
      document.body.setAttribute('data-theme', 'light');
      this._themeVariante = 'light';
    }
    this._saveTheme();
  }

  private _getTheme(): void {
    const theme = localStorage.getItem('YTC:IS:DARK');
    if (theme) {
      this._themeVariante = JSON.parse(theme);
      document.body.setAttribute('data-theme', this._themeVariante);
    }
  }

  private _saveTheme(): void {
    localStorage.setItem('YTC:IS:DARK', JSON.stringify(this._themeVariante));
  }

  private _logout(): void {
    AuthorizationService.resetToken();
    this._isAuthorized = AuthorizationService.isAuthorized();
    Router.go('/');
  }
}
