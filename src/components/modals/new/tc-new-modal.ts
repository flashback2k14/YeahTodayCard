import { html, LitElement, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { loginStyles, newModalStyles } from '../../../styles';
import ConfigStore from '../../../store/config.store';
import DataStore, { InsertEntryPayload } from '../../../store/data.store';

@customElement('tc-new-modal')
export class TcNewModal extends LitElement {
  static styles = [newModalStyles, loginStyles];

  @state()
  private _isOpen: boolean = false;

  constructor() {
    super();
    ConfigStore.select('newModalIsOpen').subscribe((value: boolean) => {
      this._isOpen = value;
    });
  }

  protected render(): TemplateResult {
    return html`<dialog class="new-dialog" ?open=${this._isOpen}>
      <div class="dialog-container_content">
        <h3>Add new entry</h3>
        <form id="addForm" method="dialog" @submit=${this._handleSubmitCLick}>
          <label for="date">
            <span>Date</span>
            <input type="date" id="date" name="date" required />
          </label>
          <button type="submit" id="save">Save</button>
        </form>
      </div>
    </dialog>`;
  }

  private _handleSubmitCLick(ev: SubmitEvent): void {
    const form = ev.currentTarget as HTMLFormElement;

    if (!form.checkValidity()) {
      return;
    }

    const fd = new FormData(form);
    const selectedDate = fd.get('date')?.toString() ?? Date.now();
    const formattedDate = new Intl.DateTimeFormat(navigator.language, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(new Date(selectedDate));

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
