import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import { testData } from '../../../utils';

import './tc-card.js';

@customElement('tc-cards')
class TcCards extends LitElement {
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
      ${testData.map(
        (entry) =>
          html`<tc-card key=${entry.title} cardTitle="${entry.title}" cardContent="${entry.content}"></tc-card>`
      )}
    </ul>`;
  }
}
