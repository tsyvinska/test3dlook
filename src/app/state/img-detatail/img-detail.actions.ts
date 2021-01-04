import { Params } from '@angular/router';
import { Action } from '@ngrx/store';
import { ApiData } from '../../api-data';

export enum ImgDetailActionTypes {
  ImgDetailResults = '[ImgDetail] Load Results',
  ImgDetailSuccess = '[ImgDetail] Load Results Success',
  ImgDetailFail = '[ImgDetail] Load Results Fail',
}
export class ImgDetailResults implements Action {
  readonly type = ImgDetailActionTypes.ImgDetailResults;
  constructor(public payload: { params: Params }) { }
}
export class ImgDetailResultsSuccess implements Action {
  readonly type = ImgDetailActionTypes.ImgDetailSuccess;
  constructor(public payload: any) { }
}
export class ImgDetailResultsFail implements Action {
  readonly type = ImgDetailActionTypes.ImgDetailFail;
  constructor(public payload: { error: any }) { }
}

export type ImgDetailActions =
  | ImgDetailResults
  | ImgDetailResultsSuccess
  | ImgDetailResultsFail;

