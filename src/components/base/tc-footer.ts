import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { AuthStateController } from '../../controller/auth-state.controller';
import { footerStyles } from '../../styles';

@customElement('tc-footer')
export class TcFooter extends LitElement {
  static styles = footerStyles;

  private _authStateController = new AuthStateController(this);

  protected render() {
    return html`<footer>
      <span>github</span>
      ${this._authStateController.isAuthorized
        ? html` <button>
            <svg
              width="24"
              height="24"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
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
}
