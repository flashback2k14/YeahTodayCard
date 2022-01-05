import { LitElement, html, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ClassInfo, classMap } from 'lit/directives/class-map.js';

import { Entry, EntryDetail } from '../../../models';
import DataStore, {
  DeleteDetailPayload,
  DeleteEntryPayload,
  InsertDetailPayload,
  UpdateEntryPayload,
} from '../../../store/data.store';
import { cardStyles } from '../../../styles';
import { uuidV4 } from '../../../utils';
import ConfigStore from '../../../store/config.store';

@customElement('tc-card')
export class TcCard extends LitElement {
  static styles = cardStyles;

  @property({ type: Object })
  entry?: Entry;

  @state()
  private _isHidden: boolean = true;

  @state()
  private _isEdit: boolean = false;

  protected render(): TemplateResult {
    const score = this._calculateScore();
    return html`<li class="card-item">
      <span class=${classMap(this._getTitleClasses())} @click=${this._changeVisibility}>
        ${this.entry?.title} - ${score}
      </span>
      <section class=${classMap(this._getContentClasses())}>
        ${this._tableTemplate()}
        <div class="card-item_buttons">
          ${this._deleteButtonTemplate()}
          <div class="card-item_buttons-right">
            ${this._addButtonTemplate()} ${this._editButtonTemplate()} ${this._copyButtonTemplate()}
          </div>
        </div>
      </section>
    </li>`;
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

  private _getTaskClasses(done: boolean): ClassInfo {
    return {
      'border-right': true,
      'column-left': true,
      'text-strike-through': done,
    };
  }

  private _calculateScore(): string {
    if (this.entry?.totalPoints === 0 && this.entry.totalAwardedPoints === 0) {
      return '0.0000';
    }
    return ((this.entry?.totalAwardedPoints ?? 1) / (this.entry?.totalPoints ?? 1)).toFixed(4);
  }

  /**
   * TEMPLATES
   */

  private _tableTemplate(): TemplateResult {
    return html`<table>
      <thead>
        <tr>
          <th class="flex-none column-width border-bottom border-right text-center" title="done">D</th>
          <th class="flex-none column-width border-bottom border-right text-center" title="number">N</th>
          <th class="flex-grow column-left border-bottom border-right">Tasks</th>
          <th class="flex-none column-width border-bottom border-right text-center" title="possible points">P</th>
          <th class="flex-none column-width border-bottom border-right text-center" title="actual points">A</th>
          <th class="flex-none column-width border-bottom text-center"></th>
        </tr>
      </thead>
      <tbody>
        ${this.entry?.details.map((detail: EntryDetail, index: number) => {
          return html`<tr>
            <td class="border-right text-center">${this._doneCheckboxTemplate(detail)}</td>
            <td class="border-right text-center">${++index}</td>
            <td class=${classMap(this._getTaskClasses(detail.done))}>
              ${this._isEdit && !detail.done
                ? html`<input
                    type="text"
                    class="entry-detail_input input_text"
                    .value=${detail.task}
                    @change=${(ev: InputEvent) => this._handleEditChange(ev, detail, 'task')}
                  />`
                : detail.task}
            </td>
            <td class="border-right text-center">${detail.points}</td>
            <td class="border-right text-center">
              ${this._isEdit && !detail.done
                ? html`<input
                    type="number"
                    class="entry-detail_input input_number"
                    value=${detail.awardedPoints}
                    @change=${(ev: InputEvent) => this._handleEditChange(ev, detail, 'awardedPoints')}
                  />`
                : detail.awardedPoints}
            </td>
            <td class="text-center icon">${this._deleteButtonTemplate(detail)}</td>
          </tr>`;
        })}
      </tbody>
      <tfoot>
        <tr>
          <td class="border-top border-right text-bold text-center">Sum</td>
          <td class="border-top border-right"></td>
          <td class="border-top border-right"></td>
          <td class="border-top border-right text-bold text-center">${this.entry?.totalPoints}</td>
          <td class="border-top border-right text-bold text-center">${this.entry?.totalAwardedPoints}</td>
          <td class="border-top"></td>
        </tr>
      </tfoot>
    </table>`;
  }

  private _doneCheckboxTemplate(detail: EntryDetail): TemplateResult {
    const id = uuidV4();
    return html`<input
        id="${id}"
        type="checkbox"
        ?checked=${detail.done}
        @click=${() => this._handleDoneChange(detail)}
      /><label for="${id}"></label> `;
  }

  /**
   * https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_js_dropdown_hover
   * @param detail
   * @returns
   */
  private _menuButtonTemplate(detail: EntryDetail): TemplateResult {
    return html`<svg
      width="24"
      height="24"
      stroke-width="1.5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Open actions</title>

      <path d="M3 5H21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M3 12H21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M3 19H21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
    </svg> `;
  }

  private _deleteButtonTemplate(detail?: EntryDetail): TemplateResult {
    return html`<svg
      @click=${() => (detail ? this._handleDeleteDetailClick(detail) : this._handleDeleteClick())}
      width="24"
      height="24"
      stroke-width="1.5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Delete current entry</title>

      <path
        d="M19 11V20.4C19 20.7314 18.7314 21 18.4 21H5.6C5.26863 21 5 20.7314 5 20.4V11"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path d="M10 17V11" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M14 17V11" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
      <path
        d="M21 7L16 7M3 7L8 7M8 7V3.6C8 3.26863 8.26863 3 8.6 3L15.4 3C15.7314 3 16 3.26863 16 3.6V7M8 7L16 7"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg> `;
  }

  private _addButtonTemplate(): TemplateResult {
    return html`<svg
      @click=${this._handleAddClick}
      width="24"
      height="24"
      stroke-width="1.5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Add new entry</title>

      <path
        d="M6 12H12M18 12H12M12 12V6M12 12V18"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg> `;
  }

  private _editButtonTemplate(): TemplateResult {
    return html`<svg
      @click=${this._handleEditClick}
      width="24"
      height="24"
      stroke-width="1.5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Edit current entry</title>

      <path d="M3 21L12 21H21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
      <path
        d="M12.2218 5.82839L15.0503 2.99996L20 7.94971L17.1716 10.7781M12.2218 5.82839L6.61522 11.435C6.42769 11.6225 6.32233 11.8769 6.32233 12.1421L6.32233 16.6776L10.8579 16.6776C11.1231 16.6776 11.3774 16.5723 11.565 16.3847L17.1716 10.7781M12.2218 5.82839L17.1716 10.7781"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg> `;
  }

  private _copyButtonTemplate(): TemplateResult {
    return html`<svg
      @click=${this._handleCopyClick}
      width="24"
      height="24"
      stroke-width="1.5"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Copy open entries to next day</title>

      <path
        d="M12 6C10.8954 6 10 5.10457 10 4C10 2.89543 10.8954 2 12 2C13.1046 2 14 2.89543 14 4C14 5.10457 13.1046 6 12 6Z"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12 9L12 22M12 22L15 19M12 22L9 19"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg> `;
  }

  /**
   * EVENT HANDLER - CHANGE
   */

  private _handleDoneChange(detail: EntryDetail): void {
    detail.done = !detail.done;
    DataStore.dispatch({
      type: 'UPDATE',
      payload: { id: this.entry?.id, entry: this.entry } as UpdateEntryPayload,
    });
    this.requestUpdate();
  }

  private _handleEditChange<K extends keyof EntryDetail>(event: InputEvent, detail: EntryDetail, property: K): void {
    if (property === 'task') {
      detail.task = (event.currentTarget as HTMLInputElement).value;
    }

    if (property === 'awardedPoints') {
      const userInput = +(event.currentTarget as HTMLInputElement).value;
      detail.awardedPoints = userInput > detail.points ? detail.points : userInput;
      detail.done = detail.points === detail.awardedPoints;
    }
  }

  /**
   * EVENT HANDLER - CLICK
   */

  private _handleDeleteClick(): void {
    DataStore.dispatch({
      type: 'DELETE',
      payload: {
        entryId: this.entry?.id,
      } as DeleteEntryPayload,
    });
    this.requestUpdate();
  }

  private _handleDeleteDetailClick(detail: EntryDetail): void {
    DataStore.dispatch({
      type: 'DELETE_DETAIL',
      payload: {
        entryId: this.entry?.id,
        detailId: detail.id,
      } as DeleteDetailPayload,
    });
    this.requestUpdate();
  }

  private _handleAddClick(): void {
    DataStore.dispatch({
      type: 'INSERT_DETAIL',
      payload: {
        entryId: this.entry?.id,
        task: '',
      } as InsertDetailPayload,
    });
    this.requestUpdate();
  }

  private _handleEditClick(): void {
    if (this._isEdit) {
      DataStore.dispatch({
        type: 'UPDATE',
        payload: {
          id: this.entry?.id,
          entry: this.entry,
        } as UpdateEntryPayload,
      });
      this._isEdit = false;
      this.requestUpdate();
    } else {
      this._isEdit = true;
    }
  }

  private _handleCopyClick(): void {
    ConfigStore.dispatch({
      type: 'HANDLE_TASKS_FOR_COPY_TRANSFER',
      payload: this.entry?.details
        .filter((detail: EntryDetail) => !detail.done)
        .map((detail: EntryDetail) => detail.task),
    });

    ConfigStore.dispatch({
      type: 'HANDLE_COPY_MODAL_OPEN',
    });
  }
}
