import { ThemeVariant } from '../models';
import { ReducerFn, Store } from '.';

export type ConfigStoreActionType = 'HANDLE_LOGIN' | 'HANDLE_THEME_SWITCH' | 'HANDLE_NEW_MODAL_OPEN';

export interface ConfigAction {
  type: ConfigStoreActionType;
  payload?: unknown;
}

export interface ConfigState {
  isAuthenticated: boolean;
  themeVariant: ThemeVariant;
  newModalIsOpen: boolean;
}

const initialState: ConfigState = {
  isAuthenticated: false,
  themeVariant: 'light',
  newModalIsOpen: false,
};

const reducer: ReducerFn<ConfigState, ConfigAction> = (state: ConfigState, action: ConfigAction): ConfigState => {
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
    case 'HANDLE_NEW_MODAL_OPEN': {
      return {
        ...state,
        newModalIsOpen: !state.newModalIsOpen,
      };
    }
    default: {
      return state;
    }
  }
};

const configStore = new Store<ConfigState, ConfigAction>(reducer, initialState);

export default configStore;
