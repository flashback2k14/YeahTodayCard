import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import './base/tc-header.js';
import './base/tc-main.js';
import './modals/new/tc-new-modal.js';
import './modals/copy/tc-copy-modal.js';
import './base/tc-footer.js';

@customElement('tc-app')
export class TcApp extends LitElement {
  protected render() {
    return html`
      <tc-header></tc-header>
      <tc-main>
        <tc-new-modal></tc-new-modal>
        <tc-copy-modal></tc-copy-modal>
        <slot></slot>
      </tc-main>
      <tc-footer></tc-footer>
    `;
  }
}
