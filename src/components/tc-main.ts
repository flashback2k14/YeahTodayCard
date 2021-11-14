import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('tc-main')
class TcMain extends LitElement {
  static styles = css`
    main {
      display: flex;
      align-items: center;
      justify-content: center;
      height: calc(100vh - 48px - 48px);
      overflow: auto;
    }
  `;

  protected render() {
    return html`<main>
      <slot></slot>
    </main>`;
  }
}
