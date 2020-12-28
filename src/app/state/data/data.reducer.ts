import { Action } from '@ngrx/store';
import { DataActionTypes, DataActions } from './data.actions';
import { ApiData } from '../../api-data';

export interface State {
  data: ApiData[];
  error: any;
}

export const initialState: State = {
  data: [],
  error: null
};

export function reducer(state = initialState, action: DataActions): State {
  switch (action.type) {
    case DataActionTypes.LoadSearchResults: {
      return {
        ...state,
        error: null
      };
    }

    case DataActionTypes.LoadSearchResultsSuccess: {
      return {
        ...state,
        data: action.payload,
        error: null
      };
    }

    case DataActionTypes.LoadSearchResultsFail: {
      return {
        ...state,
        error: action.payload
      };
    }

    default:
      return state;
  }
}
