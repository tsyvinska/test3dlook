import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './data.reducer';


export const getLoaderState = createFeatureSelector<State>('loader');

export const getLoader = createSelector(
  getLoaderState,
  (state: State) => state.loading
);

export const getSearchResultsState = createFeatureSelector<State>('search');

export const getSearchResults = createSelector(
  getSearchResultsState,
  (state: State) => state.data
);

export const getTagsState = createFeatureSelector<State>('tags');

export const getTages = createSelector(
  getTagsState,
  (state: State) => state.data.hits[0].tags
);
