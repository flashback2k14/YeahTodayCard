import { BehaviorSubject, distinctUntilKeyChanged, Observable, pluck, Subscription } from 'rxjs';

export type ReducerFn<T, A> = (state: T, action: A) => T;

export type SubscribeCallback<T> = (state: T) => void;

export class Store<T, A> {
  private _state: BehaviorSubject<T>;
  private _reducer: ReducerFn<T, A>;

  constructor(reducer: ReducerFn<T, A>, initialState: T) {
    this._reducer = reducer;
    this._state = new BehaviorSubject(initialState);
  }

  select<K extends keyof T>(key: K): Observable<T[K]> {
    return this._state.pipe(distinctUntilKeyChanged(key), pluck(key));
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
