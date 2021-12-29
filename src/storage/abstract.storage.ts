import { Entry, EntryDetail, Points } from '../models';

export abstract class AbstractStorage {
  abstract get data(): Entry[];

  abstract create(date: string): Entry[];

  abstract update(entryId: string, entry: Entry): Entry[];

  abstract delete(entryId: string): Entry[];

  abstract createDetail(entryId: string, task: string): Entry[];

  abstract updateDetail(entryId: string, detailId: string, detail: EntryDetail): Entry[];

  abstract deleteDetail(entryId: string, detailId: string): Entry[];

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
