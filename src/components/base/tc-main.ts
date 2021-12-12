import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { mainStyles } from '../../styles';

@customElement('tc-main')
export class TcMain extends LitElement {
  static styles = mainStyles;

  protected render() {
    return html`<main>
      <slot></slot>
    </main>`;
  }
}
