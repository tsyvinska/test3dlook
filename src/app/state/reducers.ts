import { ActionReducerMap } from "@ngrx/store";
//import { Action } from '@ngrx/store';
import { DataActions } from "./data/data.actions";
import { LoaderActions } from "./loader/loader.actions";
import { reducer as loaderReducer, State as LoaderState } from "./loader/loader.reducer";
import { reducer as DataReducer, State as DataState } from "./data/data.reducer";
//import { Action } from 'rxjs/internal/scheduler/Action';

export type Actions = LoaderActions & DataActions;

export interface GlobalState {
  loader: LoaderState,
  search: DataState
}
export const rootReducer: ActionReducerMap<GlobalState, Actions> = {
  loader: loaderReducer,
  search: DataReducer
}
