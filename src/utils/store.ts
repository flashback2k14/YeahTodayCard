import { BehaviorSubject, distinctUntilKeyChanged, Observable, pluck, Subscription } from 'rxjs';

import { StoreActionType, ThemeVariant } from '../models';

/**
 * DEFINE STORE
 */

export interface State {
  isAuthenticated: boolean;
  themeVariant: ThemeVariant;
}

export interface Action {
  type: StoreActionType;
  payload?: unknown;
}

export type ReducerFn<T> = (state: T, action: Action) => T;

export type SubscribeCallback<T> = (state: T) => void;

export class Store<T> {
  private _state: BehaviorSubject<T>;
  private _reducer: ReducerFn<T>;

  constructor(reducer: ReducerFn<T>, initialState: T) {
    this._reducer = reducer;
    this._state = new BehaviorSubject(initialState);
  }

  select<K extends keyof T>(key: K): Observable<T[K]> {
    return this._state.pipe(distinctUntilKeyChanged(key), pluck(key));
  }

  subscribe(callback: SubscribeCallback<T>): Subscription {
    return this._state.subscribe(callback);
  }

  dispatch = (action: Action): void => {
    const oldState = this._state.getValue();
    const newState = this._reducer(oldState, action);
    this._state.next(newState);
  };
}

/**
 * CREATE STORE
 */

const initialState: State = {
  isAuthenticated: false,
  themeVariant: 'light',
};

const reducer: ReducerFn<State> = (state: State, action: Action): State => {
  switch (action.type) {
    case 'HANDLE_LOGIN': {
      return {
        ...state,
        isAuthenticated: action.payload as boolean,
      };
    }
    case 'HANDLE_THEME_SWITCH': {
      return {
        ...state,
        themeVariant: action.payload as ThemeVariant,
      };
    }
    default: {
      return state;
    }
  }
};

const store = new Store<State>(reducer, initialState);

export default store;
