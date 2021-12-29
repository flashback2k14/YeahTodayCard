import { ReducerWithStorageFn, Store } from '.';
import { Entry, EntryDetail } from '../models';
import { AbstractStorage } from '../storage/abstract.storage';
import { inMemoryStorage } from '../storage/inmemory.storage';

export type DataStoreEntryActionType = 'GET' | 'INSERT' | 'UPDATE' | 'DELETE';
export type DataStoreDetailActionType = 'INSERT_DETAIL' | 'UPDATE_DETAIL' | 'DELETE_DETAIL';
export type DataStoreActionType = DataStoreEntryActionType | DataStoreDetailActionType;

export type InsertEntryPayload = {
  date: string;
};
export type UpdateEntryPayload = {
  id: string;
  entry: Entry;
};
export type DeleteEntryPayload = {
  entryId: string;
};
export type EntryPayload = InsertEntryPayload | UpdateEntryPayload | DeleteEntryPayload;

export type InsertDetailPayload = {
  entryId: string;
  task: string;
};
export type UpdateDetailPayload = {
  entryId: string;
  detailId: string;
  detail: EntryDetail;
};
export type DeleteDetailPayload = {
  entryId: string;
  detailId: string;
};
export type DetailPayload = InsertDetailPayload | UpdateDetailPayload | DeleteDetailPayload;

export interface DataAction {
  type: DataStoreActionType;
  payload?: EntryPayload | DetailPayload;
}

export interface DataState {
  entries: Entry[];
}

const initialState: DataState = {
  entries: [],
};

const reducer: ReducerWithStorageFn<DataState, DataAction> =
  (storage: AbstractStorage) =>
  (state: DataState, action: DataAction): DataState => {
    switch (action.type) {
      case 'GET': {
        return {
          ...state,
          entries: storage.data,
        };
      }
      case 'INSERT': {
        return {
          ...state,
          entries: storage.create((action.payload as InsertEntryPayload).date),
        };
      }
      case 'INSERT_DETAIL': {
        const payload = action.payload as InsertDetailPayload;
        return {
          ...state,
          entries: storage.createDetail(payload.entryId, payload.task),
        };
      }
      case 'UPDATE': {
        const payload = action.payload as UpdateEntryPayload;
        return {
          ...state,
          entries: storage.update(payload.id, payload.entry),
        };
      }
      case 'UPDATE_DETAIL': {
        const payload = action.payload as UpdateDetailPayload;
        return {
          ...state,
          entries: storage.updateDetail(payload.entryId, payload.detailId, payload.detail),
        };
      }
      case 'DELETE': {
        return {
          ...state,
          entries: storage.delete((action.payload as DeleteEntryPayload).entryId),
        };
      }
      case 'DELETE_DETAIL': {
        const payload = action.payload as DeleteDetailPayload;
        return {
          ...state,
          entries: storage.deleteDetail(payload.entryId, payload.detailId),
        };
      }
      default: {
        return state;
      }
    }
  };

const dataStore = new Store<DataState, DataAction>(reducer, initialState, inMemoryStorage);

export default dataStore;
