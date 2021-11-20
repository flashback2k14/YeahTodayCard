import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('tc-header')
class TcHeader extends LitElement {
  static styles = css`
    header {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      height: 48px;
    }

    header span {
      margin-left: 8px;
    }
  `;

  protected render() {
    return html`<header>
      <span>Yeah! Today card</span>
    </header>`;
  }
}
