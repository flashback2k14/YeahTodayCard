import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import './tc-header.js';
import './tc-main.js';
import './tc-cards.js';
import './tc-card.js';
import './tc-footer.js';

const data = [
  { title: 'Lorem Ipsum #1', content: 'Hello World #1' },
  { title: 'Lorem Ipsum #2', content: 'Hello World #2' },
  { title: 'Lorem Ipsum #3', content: 'Hello World #3' },
  { title: 'Lorem Ipsum #4', content: 'Hello World #4' },
];

@customElement('tc-app')
class TcApp extends LitElement {
  static styles = css``;

  protected render() {
    return html`
      <tc-header></tc-header>
      <tc-main>
        <tc-cards>
          ${data.map(
            (entry) =>
              html`<tc-card key=${entry.title} cardTitle="${entry.title}" cardContent="${entry.content}"></tc-card>`
          )}
        </tc-cards>
      </tc-main>
      <tc-footer></tc-footer>
    `;
  }
}
