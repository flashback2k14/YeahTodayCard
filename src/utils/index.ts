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
      {
        id: uuidV4(),
        title: 'Day: 02.11.2021',
        totalPoints: 4,
        totalAwardedPoints: 3,
        details: [
          {
            id: uuidV4(),
            task: 'Task #4',
            points: 3,
            awardedPoints: 2,
          } as EntryDetail,
          {
            id: uuidV4(),
            task: 'Task #5',
            points: 1,
            awardedPoints: 1,
          } as EntryDetail,
        ],
      } as Entry,
    ];
  }

  get data(): Entry[] {
    return this._data;
  }

  public create(entry: Entry): Entry[] {
    this._data.push(entry);
    return this._data;
  }

  public update(entryId: string, entry: Entry): Entry[] {
    const foundIndex = this._data.findIndex((entry: Entry) => entry.id === entryId);

    if (foundIndex === -1) {
      this._data.push(entry);
    } else {
      this._data[foundIndex] = entry;
    }

    return this._data;
  }

  public delete(entryId: string): Entry[] {
    this._data = this._data.filter((entry: Entry) => entry.id !== entryId);
    return this._data;
  }
}

export const inMemoryStore = new InMemoryStore();
