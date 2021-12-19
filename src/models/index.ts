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
}

export type ThemeVariant = 'light' | 'dark';

export type StoreActionType = 'HANDLE_LOGIN' | 'HANDLE_THEME_SWITCH';
