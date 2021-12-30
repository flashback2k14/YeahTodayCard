import { Entry, EntryDetail, Points } from '../models';
import { uuidV4 } from '../utils';

export abstract class AbstractStorage {
  abstract get data(): Entry[];

  abstract create(date: string): Entry[];

  abstract update(entryId: string, entry: Entry): Entry[];

  abstract delete(entryId: string): Entry[];

  abstract createDetail(entryId: string, task: string): Entry[];

  abstract updateDetail(entryId: string, detailId: string, detail: EntryDetail): Entry[];

  abstract deleteDetail(entryId: string, detailId: string): Entry[];

  abstract copyDetails(date: string, tasks: string[]): Entry[];

  protected createEntry(date: string): Entry {
    return {
      id: uuidV4(),
      title: `Day: ${date}`,
      totalPoints: 0,
      totalAwardedPoints: 0,
      details: [] as EntryDetail[],
    } as Entry;
  }

  protected createEntryDetail(task: string): EntryDetail {
    return {
      id: uuidV4(),
      task: task,
      done: false,
      points: 0,
      awardedPoints: 0,
    } as EntryDetail;
  }

  protected reordering(entry: Entry): void {
    let detailSize = entry.details.length;
    entry.details.forEach((detail: EntryDetail) => {
      detail.points = detailSize--;
    });
  }

  protected calculate(entry: Entry): void {
    const points: Points = entry.details
      .map(
        (detail: EntryDetail) =>
          ({
            possible: detail.points,
            awarded: detail.awardedPoints,
          } as Points)
      )
      .reduce(
        (acc: Points, curr: Points) =>
          ({
            possible: (acc.possible += curr.possible),
            awarded: (acc.awarded += curr.awarded),
          } as Points),
        { possible: 0, awarded: 0 } as Points
      );

    entry.totalAwardedPoints = points.awarded;
    entry.totalPoints = points.possible;
  }
}
