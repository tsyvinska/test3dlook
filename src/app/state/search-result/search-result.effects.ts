import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpService } from '../../services/http.service';
import { LoadSearchResults, LoadSearchResultsFail, LoadSearchResultsSuccess, SearchActions, SearchActionTypes } from 'src/app/state/search-result/search-result.actions';
import { ApiData } from '../../api-data';

@Injectable()
export class SearchResutEffects {
  constructor(private actions$: Actions, private httpService: HttpService) { }

  @Effect()
  getSearchResut$ = this.actions$.pipe(
    ofType(SearchActionTypes.LoadSearchResults),
    switchMap((action: LoadSearchResults) =>
      this.httpService.getRes(action.payload.search, action.payload.amount).pipe(
        map((results: ApiData) => new LoadSearchResultsSuccess(results)),
        catchError(error => of(new LoadSearchResultsFail(error)))
      )
    )
  );
}
