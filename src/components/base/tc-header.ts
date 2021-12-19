import { LitElement, html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { Router } from '@vaadin/router';

import { headerStyles } from '../../styles';
import { ThemeSwitchController } from '../../controller/theme-switch.controller';
import { AuthorizationService } from '../../auth/authorization-service';
import ConfigStore from '../../store/config-store';

@customElement('tc-header')
export class TcHeader extends LitElement {
  private _themeSwitchController = new ThemeSwitchController(this);

  @state()
  private _isAuthorized: boolean = false;

  static styles = headerStyles;

  constructor() {
    super();
    ConfigStore.select('isAuthenticated').subscribe((value: boolean) => {
      this._isAuthorized = value;
    });
  }

  protected render(): TemplateResult {
    return html`<header>
      <span>Yeah! today card</span>
      <div>${this._themeTemplate()} ${this._isAuthorized ? this._logoutTemplate() : null}</div>
    </header>`;
  }

  private _themeTemplate(): TemplateResult {
    return this._themeSwitchController.themeVariante === 'dark'
      ? html`<svg
          @click=${this._themeSwitchController.toggleTheme.bind(this._themeSwitchController)}
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
          @click=${this._themeSwitchController.toggleTheme.bind(this._themeSwitchController)}
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

  private _logoutTemplate(): TemplateResult {
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

  private _logout(): void {
    AuthorizationService.resetToken();
    ConfigStore.dispatch({ type: 'HANDLE_LOGIN', payload: AuthorizationService.isAuthorized() });
    Router.go('/');
  }
}
