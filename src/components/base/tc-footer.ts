import { LitElement, html, TemplateResult } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';

import { footerStyles } from '../../styles';
import ConfigStore, { ConfigState } from '../../store/config.store';

@customElement('tc-footer')
export class TcFooter extends LitElement {
  static styles = footerStyles;

  @query('button')
  private _button!: HTMLButtonElement;

  @state()
  private _isAuthorized: boolean = false;

  @state()
  private _isNewModalOpen: boolean = false;

  constructor() {
    super();
    ConfigStore.subscribe((value: ConfigState) => {
      this._isAuthorized = value.isAuthenticated;
      this._isNewModalOpen = value.newModalIsOpen;
    });
  }

  connectedCallback(): void {
    super.connectedCallback();
    if ('virtualKeyboard' in navigator) {
      navigator.virtualKeyboard.overlaysContent = true;
      navigator.virtualKeyboard.addEventListener('geometrychange', this._handleKeyboardVisibility);
    }
  }

  disconnectedCallback(): void {
    if ('virtualKeyboard' in navigator) {
      navigator.virtualKeyboard.overlaysContent = false;
      navigator.virtualKeyboard.removeEventListener('geometrychange', this._handleKeyboardVisibility);
    }
    super.disconnectedCallback();
  }

  protected render(): TemplateResult {
    return html`<footer>
      ${this._renderGithubLink()}
      ${this._isAuthorized
        ? this._isNewModalOpen
          ? html`<button @click=${this._handleOpenNewModalClick}>
              <svg
                width="24"
                height="24"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>`
          : html` <button @click=${this._handleOpenNewModalClick}>
              <svg
                width="24"
                height="24"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Open add new entry modal</title>

                <path
                  d="M6 12H12M18 12H12M12 12V6M12 12V18"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>`
        : null}
    </footer>`;
  }

  private _renderGithubLink(): TemplateResult {
    return html`<a
      href="https://github.com/flashback2k14/YeahTodayCard"
      target="_blank"
      rel="noopener"
      class="footer-anchor"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 16 16"
        fill="#fff"
        class="footer-icon"
      >
        <path
          d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
        />
      </svg>
      <span>developed by flashback2k14</span>
    </a>`;
  }

  private _handleOpenNewModalClick(): void {
    ConfigStore.dispatch({
      type: 'HANDLE_NEW_MODAL_OPEN',
    });
  }

  private _handleKeyboardVisibility(ev: any): void {
    const { height } = ev.target.boundingRect;
    if (height === 0) {
      this._button.classList.add('show');
      this._button.classList.remove('hide');
    } else {
      this._button.classList.add('hide');
      this._button.classList.remove('show');
    }
  }
}
