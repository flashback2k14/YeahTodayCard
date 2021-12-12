import { LitElement, html, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ClassInfo, classMap } from 'lit/directives/class-map.js';

import { Entry, EntryDetail } from '../../../models';
import { cardStyles } from '../../../styles';

@customElement('tc-card')
export class TcCard extends LitElement {
  static styles = cardStyles;

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
