import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ClassInfo, classMap } from 'lit/directives/class-map.js';

import { Entry, EntryDetail } from '../../../models';

@customElement('tc-card')
export class TcCard extends LitElement {
  static styles = css`
    .card-item {
      margin: 8px 4px;
      padding: var(--size-fluid-3);

      border-radius: var(--radius-2);
      box-shadow: var(--shadow-2);

      transition: 0.4s;
    }

    .card-item:last-child {
      border-bottom: none;
    }

    .card-item_title {
      margin: 4px 0;
      font-size: large;
      cursor: pointer;
    }

    .card-item_title:hover {
      border-bottom: 1px solid var(--border-table);
    }

    .card-item_title:after {
      float: right;
      margin-left: 4px;
      margin-right: 4px;
      color: var(--color);
      content: '\\002B';
    }

    .card-item_content {
      margin: 4px 0;
    }

    .active {
      font-weight: bold;
    }

    .active:after {
      content: '\\2212';
    }

    .visible {
      display: flex;
    }

    .hidden {
      display: none;
    }

    table {
      width: 100%;
      margin-top: 8px;
      border-collapse: collapse;
    }

    thead tr th:first-child {
      flex-grow: 1;
      border-bottom: 1px solid var(--border-table);
      border-right: 1px solid var(--border-table);
    }

    thead tr th:nth-child(2) {
      flex: none;
      width: 48px;
      border-bottom: 1px solid var(--border-table);
      border-right: 1px solid var(--border-table);
      text-align: center;
    }

    thead tr th:last-child {
      flex: none;
      width: 48px;
      border-bottom: 1px solid var(--border-table);
      text-align: center;
    }

    tbody tr td:first-child {
      border-right: 1px solid var(--border-table);
    }

    tbody tr td:nth-child(2) {
      border-right: 1px solid var(--border-table);
      text-align: center;
    }

    tbody tr td:last-child {
      text-align: center;
    }

    tfoot tr td:first-child {
      border-top: 1px solid var(--border-table);
      border-right: 1px solid var(--border-table);
      font-weight: bold;
    }

    tfoot tr td:nth-child(2) {
      border-top: 1px solid var(--border-table);
      border-right: 1px solid var(--border-table);
      text-align: center;
      font-weight: bold;
    }

    tfoot tr td:last-child {
      border-top: 1px solid var(--border-table);
      text-align: center;
      font-weight: bold;
    }
  `;

  @property({ type: Object })
  entry?: Entry;

  @state()
  private _isHidden: boolean = true;

  protected render(): TemplateResult {
    const score = this._calculateScore();
    return html`<li class="card-item">
      <span class=${classMap(this._getTitleClasses())} @click=${this._changeVisibility}>
        ${this.entry?.title} - ${score}
      </span>
      <section class=${classMap(this._getContentClasses())}>${this._tableTemplate()}</section>
    </li>`;
  }

  private _calculateScore(): string {
    return ((this.entry?.totalAwardedPoints ?? 1) / (this.entry?.totalPoints ?? 1)).toFixed(4);
  }

  private _tableTemplate(): TemplateResult {
    return html`<table>
      <thead>
        <tr>
          <th>Tasks</th>
          <th>P</th>
          <th>A</th>
        </tr>
      </thead>
      <tbody>
        ${this.entry?.details.map((detail: EntryDetail) => {
          return html`<tr>
            <td>${detail.task}</td>
            <td>${detail.points}</td>
            <td>${detail.awardedPoints}</td>
          </tr>`;
        })}
      </tbody>
      <tfoot>
        <tr>
          <td>Sum</td>
          <td>${this.entry?.totalPoints}</td>
          <td>${this.entry?.totalAwardedPoints}</td>
        </tr>
      </tfoot>
    </table>`;
  }

  /**
   * VISIBILITY
   */

  private _changeVisibility(): void {
    this._isHidden = !this._isHidden;
    this._getTitleClasses();
    this._getContentClasses();
  }

  private _getTitleClasses(): ClassInfo {
    return {
      'card-item_title': true,
      active: !this._isHidden,
    };
  }

  private _getContentClasses(): ClassInfo {
    return {
      'card-item_content': true,
      hidden: this._isHidden,
      visible: !this._isHidden,
    };
  }
}
