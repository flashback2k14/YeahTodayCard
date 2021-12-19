import { ReducerFn, Store } from '.';
import { Entry } from '../models';
import { inMemoryStore } from '../utils/index';

export type DataStoreActionType = 'GET' | 'INSERT' | 'UPDATE' | 'DELETE';

export interface DataAction {
  type: DataStoreActionType;
  payload?: unknown;
}

export interface DataState {
  entries: Entry[];
}

const initialState: DataState = {
  entries: [],
};

const reducer: ReducerFn<DataState, DataAction> = (state: DataState, action: DataAction): DataState => {
  switch (action.type) {
    case 'GET': {
      return {
        ...state,
        entries: inMemoryStore.data,
      };
    }
    case 'INSERT': {
      return {
        ...state,
        entries: inMemoryStore.create(action.payload as Entry),
      };
    }
    case 'UPDATE': {
      return {
        ...state,
        entries: inMemoryStore.update((action.payload as any).id, (action.payload as any).data as Entry),
      };
    }
    case 'DELETE': {
      return {
        ...state,
        entries: inMemoryStore.delete(action.payload as string),
      };
    }
    default: {
      return state;
    }
  }
};

const dataStore = new Store<DataState, DataAction>(reducer, initialState);

export default dataStore;
