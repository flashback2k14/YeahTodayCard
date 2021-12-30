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
      <span>github</span>
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
