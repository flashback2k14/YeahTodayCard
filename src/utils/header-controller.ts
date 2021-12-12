import { ReactiveController, ReactiveControllerHost } from '@lit/reactive-element';
import { Router } from '@vaadin/router';

import { AuthorizationService } from '../auth/authorization-service';
import EventBus, { EventNames } from './event-bus';

export class HeaderController implements ReactiveController {
  private _host: ReactiveControllerHost;

  isAuthorized = AuthorizationService.isAuthorized();
  themeVariante: 'light' | 'dark' = 'light';

  constructor(host: ReactiveControllerHost) {
    this._host = host;
    host.addController(this);
  }

  hostConnected() {
    EventBus.register(EventNames.LOGGED_IN, this._handleLoginCallback.bind(this));
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', this._handleThemeChangedCallback.bind(this));
    this._setupTheme();
  }

  hostDisconnected() {
    EventBus.remove(EventNames.LOGGED_IN, this._handleLoginCallback.bind(this));
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .removeEventListener('change', this._handleThemeChangedCallback.bind(this));
  }

  toggleTheme(): void {
    if (this.themeVariante === 'light') {
      document.body.setAttribute('data-theme', 'dark');
      this.themeVariante = 'dark';
    } else {
      document.body.setAttribute('data-theme', 'light');
      this.themeVariante = 'light';
    }
    this._saveTheme();
    this._host.requestUpdate();
  }

  logout(): void {
    AuthorizationService.resetToken();
    this.isAuthorized = AuthorizationService.isAuthorized();
    Router.go('/');
    this._host.requestUpdate();
  }

  private _handleLoginCallback(): void {
    this.isAuthorized = AuthorizationService.isAuthorized();
    this._host.requestUpdate();
  }

  private _handleThemeChangedCallback({ matches: isDark }: MediaQueryListEvent): void {
    this.themeVariante = isDark ? 'dark' : 'light';
    document.body.setAttribute('data-theme', this.themeVariante);
    this._saveTheme();
    this._host.requestUpdate();
  }

  private _setupTheme(): void {
    const theme = localStorage.getItem('YTC:IS:DARK');
    if (theme) {
      this.themeVariante = JSON.parse(theme);
      document.body.setAttribute('data-theme', this.themeVariante);
      this._host.requestUpdate();
    }
  }

  private _saveTheme(): void {
    localStorage.setItem('YTC:IS:DARK', JSON.stringify(this.themeVariante));
  }
}
