import { BehaviorSubject, distinctUntilKeyChanged, map, Observable, Subscription } from 'rxjs';
import { threadId } from 'worker_threads';

export type ReducerFn<T, A> = (state: T, action: A) => T;

export type SubscribeCallback<T> = (state: T) => void;

export class Store<T, A> {
  private _state: BehaviorSubject<T>;
  private _reducer: ReducerFn<T, A>;

  constructor(reducer: ReducerFn<T, A>, initialState: T) {
    this._state = new BehaviorSubject(initialState);
    this._reducer = reducer;
  }

  select<K extends keyof T>(key: K): Observable<T[K]> {
    return this._state.pipe(
      distinctUntilKeyChanged(key),
      map((state: T) => state[key])
    );
  }

  selectArray<K extends keyof T>(key: K): Observable<T[K]> {
    return this._state.pipe(map((state: T) => state[key]));
  }

  subscribe(callback: SubscribeCallback<T>): Subscription {
    return this._state.subscribe(callback);
  }

  dispatch = (action: A): void => {
    const oldState = JSON.parse(JSON.stringify(this._state.getValue()));
    const newState = this._reducer(oldState, action);
    this._state.next(newState);
  };
}
