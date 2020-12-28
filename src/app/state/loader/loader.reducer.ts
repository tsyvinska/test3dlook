import { Action } from '@ngrx/store';
import { LoaderActionTypes, LoaderActions } from './loader.actions';

export interface State {
  isOn: boolean;
}

export const initialState: State = {
  isOn: false
};

export function reducer(state = initialState, action: LoaderActions): State {
  switch (action.type) {
    case LoaderActionTypes.StartLoader: {
      return {
        isOn: true
      };
    }

    case LoaderActionTypes.StopLoader: {
      return {
        isOn: false
      };
    }

    default:
      return state;
  }
}
