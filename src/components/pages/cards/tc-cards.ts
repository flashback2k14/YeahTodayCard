import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { Entry } from '../../../models';
import { cardsStyles } from '../../../styles';
import { store } from '../../../utils';

import './tc-card.js';

@customElement('tc-cards')
export class TcCards extends LitElement {
  static styles = cardsStyles;

  protected render() {
    return html`<ul class="card-list">
      ${store.data.map((entry: Entry) => html`<tc-card key=${entry.title} .entry=${entry}></tc-card>`)}
    </ul>`;
  }
}
