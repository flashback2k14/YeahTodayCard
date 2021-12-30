import { html, LitElement, TemplateResult } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { copyModalStyles, loginStyles, modalStyles } from '../../../styles';
import { formatDate, getCheckedTasks } from '../../../utils';
import ConfigStore from '../../../store/config.store';
import DataStore, { CopyDetailsPayload } from '../../../store/data.store';

@customElement('tc-copy-modal')
export class TcCopyModal extends LitElement {
  static styles = [modalStyles, copyModalStyles, loginStyles];

  @query('dialog')
  private _dialog!: HTMLElement;

  @state()
  private _tasks: string[] = [];

  @state()
  private _isOpen: boolean = false;

  constructor() {
    super();
    ConfigStore.select('tasksForCopyTransfer').subscribe((value: string[]) => {
      this._tasks = value;
    });
    ConfigStore.select('copyModalIsOpen').subscribe((value: boolean) => {
      this._isOpen = value;
    });
  }

  protected render(): TemplateResult {
    return html`<div
      class=${classMap({
        'tc-dialog-container': this._isOpen,
      })}
    >
      <dialog class="tc-dialog" ?open=${this._isOpen}>
        <div class="tc-dialog_content">
          <h3>Copy tasks to new entry</h3>
          <form id="copyForm" method="dialog" @submit=${this._handleSubmitClick}>
            <label for="date">
              <span>Date</span>
              <input type="date" id="date" name="date" required />
            </label>

            <label for="tasks" class="margin-top">
              <span>Tasks</span>
              <div class="tasks-container">
                ${this._tasks.map((task: string) => {
                  return html`<label class="align-items">
                    <span class="word-break">${task}</span>
                    <input type="checkbox" name="tasks[]" value=${task} />
                  </label>`;
                })}
              </div>
            </label>

            <button class="margin-top" type="submit" id="save">Save</button>
            <button class="close margin-top" @click=${this._handleCloseClick}>Close</button>
          </form>
        </div>
      </dialog>
    </div>`;
  }

  private _handleSubmitClick(ev: SubmitEvent): void {
    const form = ev.currentTarget as HTMLFormElement;

    if (!form.checkValidity()) {
      return;
    }

    const formattedDate = formatDate(form);
    const checkedTasks = getCheckedTasks(form);

    DataStore.dispatch({
      type: 'COPY_DETAILS',
      payload: {
        date: formattedDate,
        tasks: checkedTasks,
      } as CopyDetailsPayload,
    });

    ConfigStore.dispatch({
      type: 'HANDLE_COPY_MODAL_OPEN',
    });

    form.reset();
  }

  private _handleCloseClick(): void {
    (this._dialog as any).close();

    ConfigStore.dispatch({
      type: 'HANDLE_COPY_MODAL_OPEN',
    });
  }
}
