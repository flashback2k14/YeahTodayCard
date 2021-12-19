import { LitElement, html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { footerStyles } from '../../styles';
import ConfigStore from '../../store/config.store';
import DataStore from '../../store/data.store';
import { Entry } from '../../models';
import { uuidV4 } from '../../utils';

@customElement('tc-footer')
export class TcFooter extends LitElement {
  static styles = footerStyles;

  @state()
  private _isAuthorized: boolean = false;

  constructor() {
    super();
    ConfigStore.select('isAuthenticated').subscribe((value: boolean) => {
      this._isAuthorized = value;
    });
  }

  protected render(): TemplateResult {
    return html`<footer>
      <span>github</span>
      ${this._isAuthorized
        ? html` <button @click=${this._test}>
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

  private _test(): void {
    DataStore.dispatch({
      type: 'INSERT',
      payload: {
        id: uuidV4(),
        title: '03.11.2021',
        totalPoints: 0,
        totalAwardedPoints: 0,
        details: [],
      } as Entry,
    });
  }
}
