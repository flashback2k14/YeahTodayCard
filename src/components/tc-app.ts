import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import './base/tc-header.js';
import './base/tc-main.js';
import './base/tc-footer.js';

@customElement('tc-app')
export class TcApp extends LitElement {
  protected render() {
    return html`
      <tc-header></tc-header>
      <tc-main>
        <slot></slot>
      </tc-main>
      <tc-footer></tc-footer>
    `;
  }
}
