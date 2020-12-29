import { Action } from '@ngrx/store';
import { SearchActionTypes, SearchActions } from './search-result.actions';
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

export function reducer(state = initialState, action: SearchActions): State {
  switch (action.type) {
    case SearchActionTypes.LoadSearchResults: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }

    case SearchActionTypes.LoadSearchResultsSuccess: {
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null
      };
    }

    case SearchActionTypes.LoadSearchResultsFail: {
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
