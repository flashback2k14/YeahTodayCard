import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('tc-footer')
class TcFooter extends LitElement {
  static styles = css`
    footer {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      height: 48px;
    }

    footer span {
      margin-left: 8px;
    }
  `;

  protected render() {
    return html`<footer>
      <span>github</span>
    </footer>`;
  }
}
