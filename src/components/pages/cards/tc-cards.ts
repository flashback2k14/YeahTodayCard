import { LitElement, html, TemplateResult } from 'lit';
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
      this._cards = [...value];
    });
  }

  protected render(): TemplateResult {
    return this._cards?.length > 0 ? this._renderCards() : this._renderNoCards();
  }

  private _renderNoCards(): TemplateResult {
    return html`<div class="no-cards-container">
      <h2>No data available.</h2>
    </div>`;
  }

  private _renderCards(): TemplateResult {
    return html`<ul class="card-list">
      ${this._cards.map((entry: Entry) => {
        return html`<tc-card key=${entry.title} .entry=${entry}></tc-card>`;
      })}
    </ul>`;
  }
}
