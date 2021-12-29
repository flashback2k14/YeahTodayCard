import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, distinctUntilKeyChanged, map } from 'rxjs/operators';

import { AbstractStorage } from '../storage/abstract.storage';

export type ReducerWithStorageFn<T, A> = (storage: AbstractStorage) => ReducerFn<T, A>;
export type ReducerFn<T, A> = (state: T, action: A) => T;

export type SubscribeCallback<T> = (state: T) => void;

export class Store<T, A> {
  private _state: BehaviorSubject<T>;
  private _reducer: ReducerFn<T, A>;

  constructor(reducer: ReducerFn<T, A>, initialState: T);
  constructor(reducer: ReducerWithStorageFn<T, A>, initialState: T, storage: AbstractStorage);
  constructor(reducer: ReducerFn<T, A> | ReducerWithStorageFn<T, A>, initialState: T, storage?: AbstractStorage) {
    this._state = new BehaviorSubject<T>(initialState);
    this._reducer = storage
      ? ((reducer as ReducerWithStorageFn<T, A>)(storage) as ReducerFn<T, A>)
      : (reducer as ReducerFn<T, A>);
  }

  select<K extends keyof T>(key: K): Observable<T[K]> {
    return this._state.pipe(
      distinctUntilKeyChanged(key),
      map((state: T) => state[key])
    );
  }

  selectArray<K extends keyof T>(key: K): Observable<T[K]> {
    return this._state.pipe(
      distinctUntilChanged(),
      map((state: T) => state[key])
    );
  }

  subscribe(callback: SubscribeCallback<T>): Subscription {
    return this._state.subscribe(callback);
  }

  dispatch = (action: A): void => {
    const oldState = this._state.getValue();
    const newState = this._reducer(oldState, action);
    this._state.next(newState);
  };
}
