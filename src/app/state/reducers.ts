import { ActionReducerMap } from '@ngrx/store';
import { SearchActions } from './search-result/search-result.actions';
import { reducer as SearchReducer, State as SearchState } from './search-result/search-result.reducer';
import { SearchResutEffects } from './search-result/search-result.effects';

export type Actions = SearchActions;

export interface GlobalState {
  search: SearchState;
}
export const rootReducer: ActionReducerMap<GlobalState, Actions> = {
  search: SearchReducer
};

export const effects: any[] = [SearchResutEffects];
