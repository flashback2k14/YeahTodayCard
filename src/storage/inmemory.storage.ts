import { AbstractStorage } from './abstract.storage';
import { compress, decompress, initializeTestData, uuidV4 } from '../utils';
import { Entry, EntryDetail } from '../models';

class InMemoryStorage extends AbstractStorage {
  private _data: Entry[];

  constructor() {
    super();
    this._data = [];
    this._load();
  }

  get data(): Entry[] {
    return this._data;
  }

  public create(date: string): Entry[] {
    const entry = this.createEntry(date);
    this._data.push(entry);
    this._save();
    return this._data;
  }

  public createDetail(entryId: string, task: string): Entry[] {
    const foundIndex = this._data.findIndex((entry: Entry) => entry.id === entryId);
    if (foundIndex) {
      const newDetail = this.createEntryDetail(task);
      this._data[foundIndex].details.push(newDetail);

      this.reordering(this._data[foundIndex]);
      this.calculate(this._data[foundIndex]);
      this._save();
    }

    return this._data;
  }

  public update(entryId: string, entry: Entry): Entry[] {
    const foundIndex = this._data.findIndex((entry: Entry) => entry.id === entryId);

    if (foundIndex === -1) {
      this._data.push(entry);
    } else {
      this._data[foundIndex] = entry;
    }

    this.reordering(entry);
    this.calculate(entry);
    this._save();

    return this._data;
  }

  public updateDetail(entryId: string, detailId: string, detail: EntryDetail): Entry[] {
    const foundIndex = this._data.findIndex((entry: Entry) => entry.id === entryId);

    if (foundIndex) {
      const foundDetailIndex = this._data[foundIndex].details.findIndex(
        (detail: EntryDetail) => detail.id === detailId
      );

      if (foundDetailIndex === -1) {
        this._data[foundIndex].details.push(detail);
      } else {
        this._data[foundIndex].details[foundDetailIndex] = detail;
      }

      this.reordering(this._data[foundIndex]);
      this.calculate(this._data[foundIndex]);
      this._save();
    }

    return this._data;
  }

  public delete(entryId: string): Entry[] {
    this._data = this._data.filter((entry: Entry) => entry.id !== entryId);
    this._save();
    return this._data;
  }

  public deleteDetail(entryId: string, detailId: string): Entry[] {
    const foundIndex = this._data.findIndex((entry: Entry) => entry.id === entryId);
    if (foundIndex) {
      this._data[foundIndex].details = this._data[foundIndex].details.filter(
        (detail: EntryDetail) => detail.id !== detailId
      );

      this.reordering(this._data[foundIndex]);
      this.calculate(this._data[foundIndex]);
      this._save();
    }
    return this._data;
  }

  public copyDetails(date: string, tasks: string[]): Entry[] {
    const entry = this.createEntry(date);
    entry.details = tasks.map((task: string) => this.createEntryDetail(task));
    this._data.push(entry);
    this._save();
    return this._data;
  }

  private async _save(): Promise<void> {
    const compressedData = await compress(this._data);
    window.localStorage.setItem('YTC:IMS:DATA', compressedData);
  }

  private async _load(): Promise<void> {
    const data = window.localStorage.getItem('YTC:IMS:DATA');
    this._data = data ? await decompress(data) : initializeTestData();
  }
}

export const inMemoryStorage = new InMemoryStorage();
