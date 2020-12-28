import { Action } from '@ngrx/store';
import { ApiData } from '../../api-data';

export enum DataActionTypes {
  LoadSearchResults = '[Data] Load Search Results',
  LoadSearchResultsSuccess = '[Data] Load Search Results Success',
  LoadSearchResultsFail = '[Data] Load Search Results Fail',
}
export class LoadSearchResults implements Action {
  readonly type = DataActionTypes.LoadSearchResults;
}
export class LoadSearchResultsSuccess implements Action {
  readonly type = DataActionTypes.LoadSearchResultsSuccess;
  constructor(public payload: ApiData[]) { }
}
export class LoadSearchResultsFail implements Action {
  readonly type = DataActionTypes.LoadSearchResultsFail;
  constructor(public payload: { error: any }) { }
}

export type DataActions =
  | LoadSearchResults
  | LoadSearchResultsSuccess
  | LoadSearchResultsFail

