import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { footerStyles } from '../../styles';

@customElement('tc-footer')
export class TcFooter extends LitElement {
  static styles = footerStyles;

  protected render() {
    return html`<footer>
      <span>github</span>
    </footer>`;
  }
}
