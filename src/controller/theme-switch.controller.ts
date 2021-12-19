import { ReactiveController, ReactiveControllerHost } from '@lit/reactive-element';

import { ThemeVariant } from '../models';
import ConfigStore from '../store/config.store';

export class ThemeSwitchController implements ReactiveController {
  private _host: ReactiveControllerHost;

  themeVariante: ThemeVariant = 'light';

  constructor(host: ReactiveControllerHost) {
    this._host = host;
    host.addController(this);
  }

  hostConnected() {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', this._handleThemeChangedCallback.bind(this));
    this._setupTheme();
  }

  hostDisconnected() {
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
      ConfigStore.dispatch({ type: 'HANDLE_THEME_SWITCH', payload: this.themeVariante });
      this._host.requestUpdate();
    }
  }

  private _saveTheme(): void {
    localStorage.setItem('YTC:IS:DARK', JSON.stringify(this.themeVariante));
    ConfigStore.dispatch({ type: 'HANDLE_THEME_SWITCH', payload: this.themeVariante });
  }
}
