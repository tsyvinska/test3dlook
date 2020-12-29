import { ActionReducerMap } from "@ngrx/store";
import { DataActions } from "./data/data.actions";
import { reducer as DataReducer, State as DataState } from "./data/data.reducer";

export type Actions = DataActions;

export interface GlobalState {
  search: DataState
}
export const rootReducer: ActionReducerMap<GlobalState, Actions> = {
  search: DataReducer
}
