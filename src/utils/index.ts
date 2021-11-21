import { Entry, EntryDetail } from '../models';

export function uuidV4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

class InMemoryStore {
  private _data: Entry[];

  constructor() {
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
          } as EntryDetail,
          {
            id: uuidV4(),
            task: 'Task #2',
            points: 2,
            awardedPoints: 2,
          } as EntryDetail,
          {
            id: uuidV4(),
            task: 'Task #3',
            points: 1,
            awardedPoints: 1,
          } as EntryDetail,
        ],
      } as Entry,
    ];
  }

  get data() {
    return this._data;
  }

  public create(entry: Entry): void {
    this._data.push(entry);
  }

  public update(entryId: string, entry: Entry): void {
    const foundIndex = this._data.findIndex((entry: Entry) => entry.id === entryId);
    if (foundIndex === -1) {
      this._data.push(entry);
    } else {
      this._data[foundIndex] = entry;
    }
  }

  public delete(entryId: string): void {
    this._data = this._data.filter((entry: Entry) => entry.id !== entryId);
  }
}

export const store = new InMemoryStore();
