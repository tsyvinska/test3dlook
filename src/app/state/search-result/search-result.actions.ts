import { Action } from '@ngrx/store';
import { ApiData } from '../../api-data';

export enum SearchActionTypes {
  LoadSearchResults = '[Search] Load Search Results',
  LoadSearchResultsSuccess = '[Search] Load Search Results Success',
  LoadSearchResultsFail = '[Search] Load Search Results Fail',
}
export class LoadSearchResults implements Action {
  readonly type = SearchActionTypes.LoadSearchResults;
  constructor(public payload: {search: string; amount: string}) { }
}
export class LoadSearchResultsSuccess implements Action {
  readonly type = SearchActionTypes.LoadSearchResultsSuccess;
  constructor(public payload: ApiData) { }
}
export class LoadSearchResultsFail implements Action {
  readonly type = SearchActionTypes.LoadSearchResultsFail;
  constructor(public payload: { error: any }) { }
}

export type SearchActions =
  | LoadSearchResults
  | LoadSearchResultsSuccess
  | LoadSearchResultsFail;

