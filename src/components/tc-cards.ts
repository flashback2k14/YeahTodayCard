import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('tc-cards')
class TcCards extends LitElement {
  static styles = css`
    .card-list {
      width: 90vw;
      margin: 32px;
      padding: 0;
      list-style: none;
    }
  `;

  protected render() {
    return html`<ul class="card-list">
      <slot></slot>
    </ul>`;
  }
}
