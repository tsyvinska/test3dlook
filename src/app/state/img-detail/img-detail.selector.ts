import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './img-detail.reducer';

export const getImgDetailState = createFeatureSelector<State>('imgDetail');

export const getImgDetailResults = createSelector(
  getImgDetailState,
  (state: State) => state.data
);

export const getImgDetailLoader = createSelector(
  getImgDetailState,
  (state: State) => state.loading
);


export const getImgDetailTages = createSelector(
  getImgDetailState,
  (state: State) => state.data.hits[0].tags
);
