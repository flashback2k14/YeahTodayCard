import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { testData } from './utils/index.js';

import './base/tc-header.js';
import './base/tc-main.js';
import './base/tc-footer.js';

import './cards/tc-cards.js';
import './cards/tc-card.js';

@customElement('tc-app')
class TcApp extends LitElement {
  protected render() {
    return html`
      <tc-header></tc-header>
      <tc-main>
        <tc-cards>
          ${testData.map(
            (entry) =>
              html`<tc-card key=${entry.title} cardTitle="${entry.title}" cardContent="${entry.content}"></tc-card>`
          )}
        </tc-cards>
      </tc-main>
      <tc-footer></tc-footer>
    `;
  }
}
