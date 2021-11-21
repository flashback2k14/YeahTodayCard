import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ClassInfo, classMap } from 'lit/directives/class-map.js';

import { Entry, EntryDetail } from '../../../models';

@customElement('tc-card')
class TcCard extends LitElement {
  static styles = css`
    .card-item {
      margin: 4px;
      padding: 4px;
      border-bottom: 1px #424242 solid;
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
      background: rgba(0, 0, 0, 0.2);
      border-radius: 4px;
    }

    .card-item_title:after {
      float: right;
      margin-left: 4px;
      margin-right: 4px;
      color: #000;
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
  `;

  @property({ type: Object })
  entry?: Entry;

  @state()
  private _isHidden: boolean = true;

  protected render() {
    const score = this._calculateScore();
    return html`<li class="card-item">
      <span class=${classMap(this._getTitleClasses())} @click=${this._changeVisibility}
        >${this.entry?.title} - ${score}</span
      >
      <section class=${classMap(this._getContentClasses())}>${this._tableTemplate()}</section>
    </li>`;
  }

  private _calculateScore(): string {
    return ((this.entry?.totalAwardedPoints ?? 1) / (this.entry?.totalPoints ?? 1)).toFixed(4);
  }

  private _tableTemplate(): TemplateResult {
    return html`<table style="width: 100%; margin-top: 8px; border-collapse: collapse;">
      <thead>
        <tr>
          <th style="flex-grow: 1; border-bottom: 1px solid black; border-right: 1px solid black;">Tasks</th>
          <th
            style="flex: none; width: 48px; border-bottom: 1px solid black; border-right: 1px solid black; text-align: center;"
          >
            P
          </th>
          <th style="flex: none; width: 48px; border-bottom: 1px solid black; text-align: center;">A</th>
        </tr>
      </thead>
      <tbody>
        ${this.entry?.details.map((detail: EntryDetail) => {
          return html`<tr>
            <td style="border-right: 1px solid black;">${detail.task}</td>
            <td style="border-right: 1px solid black; text-align: center;">${detail.points}</td>
            <td style="text-align: center;">${detail.awardedPoints}</td>
          </tr>`;
        })}
      </tbody>
      <tfoot>
        <tr>
          <td style="border-top: 1px solid black; border-right: 1px solid black; font-weight: bold;">Sum</td>
          <td
            style="border-top: 1px solid black; border-right: 1px solid black; text-align: center; font-weight: bold;"
          >
            ${this.entry?.totalPoints}
          </td>
          <td style="border-top: 1px solid black; text-align: center; font-weight: bold;">
            ${this.entry?.totalAwardedPoints}
          </td>
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
