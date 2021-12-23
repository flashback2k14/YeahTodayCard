export interface Entry {
  id: string;
  title: string;
  details: EntryDetail[];
  totalPoints: number;
  totalAwardedPoints: number;
}

export interface EntryDetail {
  id: string;
  task: string;
  points: number;
  awardedPoints: number;
  done: boolean;
}

export type ThemeVariant = 'light' | 'dark';
