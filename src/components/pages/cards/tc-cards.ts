import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import { Entry } from '../../../models';
import { store } from '../../../utils';

import './tc-card.js';

@customElement('tc-cards')
export class TcCards extends LitElement {
  static styles = css`
    .card-list {
      display: flex;
      flex-direction: column;
      height: calc((100vh - 48px) - 48px);
      width: 90vw;
      margin: 0;
      padding: 0;
      list-style: none;
    }
  `;

  protected render() {
    return html`<ul class="card-list">
      ${store.data.map((entry: Entry) => html`<tc-card key=${entry.title} .entry=${entry}></tc-card>`)}
    </ul>`;
  }
}
