import { html, LitElement, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { loginStyles, modalStyles, newModalStyles } from '../../../styles';
import DataStore, { InsertEntryPayload } from '../../../store/data.store';
import ConfigStore from '../../../store/config.store';
import { formatDate } from '../../../utils';

@customElement('tc-new-modal')
export class TcNewModal extends LitElement {
  static styles = [modalStyles, newModalStyles, loginStyles];

  @state()
  private _isOpen: boolean = false;

  constructor() {
    super();
    ConfigStore.select('newModalIsOpen').subscribe((value: boolean) => {
      this._isOpen = value;
    });
    this.attachShadow({ mode: 'open' });
  }

  protected render(): TemplateResult {
    return html`
      <div
        class=${classMap({
          'tc-dialog-container': this._isOpen,
        })}
      >
        <dialog class="tc-dialog" ?open=${this._isOpen}>
          <div class="tc-dialog_content">
            <h3>Add new entry</h3>
            <form id="addForm" method="dialog" @submit=${this._handleSubmitClick}>
              <label for="date">
                <span>Date</span>
                <input type="date" id="date" name="date" required />
              </label>
              <button type="submit" id="save">Save</button>
            </form>
          </div>
        </dialog>
      </div>
    `;
  }

  private _handleSubmitClick(ev: SubmitEvent): void {
    const form = ev.currentTarget as HTMLFormElement;

    if (!form.checkValidity()) {
      return;
    }

    const formattedDate = formatDate(form);

    DataStore.dispatch({
      type: 'INSERT',
      payload: {
        date: formattedDate,
      } as InsertEntryPayload,
    });

    ConfigStore.dispatch({
      type: 'HANDLE_NEW_MODAL_OPEN',
    });

    form.reset();
  }
}
