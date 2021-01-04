import { ActionReducerMap } from '@ngrx/store';
import { SearchActions } from './search-result/search-result.actions';
import { reducer as SearchReducer, State as SearchState } from './search-result/search-result.reducer';
import { SearchResutEffects } from './search-result/search-result.effects';
import { ImgDetailActions } from './img-detail/img-detail.actions';
import { reducer as ImgDetailReducer, State as ImgDetailState } from './img-detail/img-detail.reducer';
import { ImgDetailEffects } from './img-detail/img-detail.effects';

export type Actions = SearchActions & ImgDetailActions;

export interface GlobalState {
  search: SearchState;
  imgDetail: ImgDetailState
}
export const rootReducer: ActionReducerMap<GlobalState, Actions> = {
  search: SearchReducer,
  imgDetail: ImgDetailReducer
};

export const effects: any[] = [SearchResutEffects, ImgDetailEffects];
