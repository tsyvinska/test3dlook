import { Action } from '@ngrx/store';
import { DataActionTypes, DataActions } from './data.actions';
import { ApiData } from '../../api-data';

export interface State {
  data: ApiData;
  loading: boolean;
  error: any;
}

export const initialState: State = {
  data: null,
  loading: false,
  error: null
};

export function reducer(state = initialState, action: DataActions): State {
  switch (action.type) {
    case DataActionTypes.LoadSearchResults: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }

    case DataActionTypes.LoadSearchResultsSuccess: {
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null
      };
    }

    case DataActionTypes.LoadSearchResultsFail: {
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }

    default:
      return state;
  }
}
