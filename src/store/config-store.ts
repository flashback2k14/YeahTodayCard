import { StoreActionType, ThemeVariant } from '../models';
import { ReducerFn, Store } from '.';

export interface Action {
  type: StoreActionType;
  payload?: unknown;
}

export interface State {
  isAuthenticated: boolean;
  themeVariant: ThemeVariant;
}

const initialState: State = {
  isAuthenticated: false,
  themeVariant: 'light',
};

const reducer: ReducerFn<State, Action> = (state: State, action: Action): State => {
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

const configStore = new Store<State, Action>(reducer, initialState);

export default configStore;
