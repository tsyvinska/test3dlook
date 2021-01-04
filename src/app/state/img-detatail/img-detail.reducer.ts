import { Action } from '@ngrx/store';
import { ImgDetailActionTypes, ImgDetailActions } from './img-detail.actions';
import { ApiData } from '../../api-data';

export interface State {
  data: any;
  loading: boolean;
  error: any;
}

export const initialState: State = {
  data: null,
  loading: false,
  error: null
};

export function reducer(state = initialState, action: ImgDetailActions): State {
  switch (action.type) {
    case ImgDetailActionTypes.ImgDetailResults: {
      return {
        ...state,
        loading: true,
        error: null
      };
    }

    case ImgDetailActionTypes.ImgDetailSuccess: {
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null
      };
    }

    case ImgDetailActionTypes.ImgDetailFail: {
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
