import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { Entry } from '../../../models';
import { cardsStyles } from '../../../styles';
import DataStore from '../../../store/data.store';

import './tc-card.js';

@customElement('tc-cards')
export class TcCards extends LitElement {
  static styles = cardsStyles;

  @state()
  private _cards: Entry[] = [];

  constructor() {
    super();
    DataStore.selectArray('entries').subscribe((value: Entry[]) => {
      console.count('DataStore entries subscribe');
      this._cards = [...value];
    });
  }

  protected render() {
    return html`<ul class="card-list">
      ${this._cards.map((entry: Entry) => html`<tc-card key=${entry.title} .entry=${entry}></tc-card>`)}
    </ul>`;
  }
}
