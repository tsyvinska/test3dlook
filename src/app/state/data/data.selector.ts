import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './data.reducer';

export const getSearchResultsState = createFeatureSelector<State>('search');

export const getSearchResults = createSelector(
  getSearchResultsState,
  (state: State) => state.data
);

export const getLoader = createSelector(
  getSearchResultsState,
(state: State) => state.loading
);


export const getTages = createSelector(
  getSearchResultsState,
  (state: State) => state.data.hits[0].tags
);
