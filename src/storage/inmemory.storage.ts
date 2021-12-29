import { Entry, EntryDetail, Points } from '../models';
import { uuidV4 } from '../utils';
import { AbstractStorage } from './abstract.storage';

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
    const entry = {
      id: uuidV4(),
      title: `Day: ${date}`,
      totalPoints: 0,
      totalAwardedPoints: 0,
      details: [] as EntryDetail[],
    } as Entry;

    this._data.push(entry);
    this._save();
    return this._data;
  }

  public createDetail(entryId: string, task: string): Entry[] {
    const foundIndex = this._data.findIndex((entry: Entry) => entry.id === entryId);
    if (foundIndex) {
      const newDetail = {
        id: uuidV4(),
        task: task,
        done: false,
        points: 0,
        awardedPoints: 0,
      } as EntryDetail;

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

  private _save(): void {
    window.localStorage.setItem('YC:IMS:DATA', JSON.stringify(this._data));
  }

  private _load(): void {
    const data = window.localStorage.getItem('YC:IMS:DATA');
    if (data) {
      this._data = JSON.parse(data) as Entry[];
    } else {
      this._data = [
        {
          id: uuidV4(),
          title: 'Day: 01.11.2021',
          totalPoints: 6,
          totalAwardedPoints: 5,
          details: [
            {
              id: uuidV4(),
              task: 'Task #1',
              points: 3,
              awardedPoints: 2,
              done: false,
            } as EntryDetail,
            {
              id: uuidV4(),
              task: 'Task #2',
              points: 2,
              awardedPoints: 2,
              done: true,
            } as EntryDetail,
            {
              id: uuidV4(),
              task: 'Task #3',
              points: 1,
              awardedPoints: 1,
              done: false,
            } as EntryDetail,
          ],
        } as Entry,
        {
          id: uuidV4(),
          title: 'Day: 02.11.2021',
          totalPoints: 3,
          totalAwardedPoints: 2,
          details: [
            {
              id: uuidV4(),
              task: 'Task #4',
              points: 2,
              awardedPoints: 1,
              done: true,
            } as EntryDetail,
            {
              id: uuidV4(),
              task: 'Task #5',
              points: 1,
              awardedPoints: 1,
              done: false,
            } as EntryDetail,
          ],
        } as Entry,
      ];
    }
  }
}

export const inMemoryStorage = new InMemoryStorage();
