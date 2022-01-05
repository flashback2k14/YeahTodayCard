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
        width="24"
        height="24"
        stroke-width="1.5"
        viewBox="0 0 24 24"
        fill="none"
        class="footer-icon"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 22.0268V19.1568C16.0375 18.68 15.9731 18.2006 15.811 17.7506C15.6489 17.3006 15.3929 16.8902 15.06 16.5468C18.2 16.1968 21.5 15.0068 21.5 9.54679C21.4997 8.15062 20.9627 6.80799 20 5.79679C20.4558 4.5753 20.4236 3.22514 19.91 2.02679C19.91 2.02679 18.73 1.67679 16 3.50679C13.708 2.88561 11.292 2.88561 8.99999 3.50679C6.26999 1.67679 5.08999 2.02679 5.08999 2.02679C4.57636 3.22514 4.54413 4.5753 4.99999 5.79679C4.03011 6.81549 3.49251 8.17026 3.49999 9.57679C3.49999 14.9968 6.79998 16.1868 9.93998 16.5768C9.61098 16.9168 9.35725 17.3222 9.19529 17.7667C9.03334 18.2112 8.96679 18.6849 8.99999 19.1568V22.0268"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M9 20.0267C6 20.9999 3.5 20.0267 2 17.0267"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
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
