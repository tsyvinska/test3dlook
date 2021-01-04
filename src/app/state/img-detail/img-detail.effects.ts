import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpService } from '../../services/http.service';
import { ApiData } from '../../api-data';
import { ImgDetailActionTypes, ImgDetailActions, ImgDetailResults, ImgDetailResultsSuccess, ImgDetailResultsFail } from './img-detail.actions';

@Injectable()
export class ImgDetailEffects {
  constructor(private actions$: Actions, private httpService: HttpService) { }

  @Effect()
  getImgDetail$ = this.actions$.pipe(
    ofType(ImgDetailActionTypes.ImgDetailResults),
    switchMap((action: ImgDetailResults) =>
      this.httpService.getImage$(action.payload.params.id).pipe(
        map((results: ApiData) => new ImgDetailResultsSuccess(results)),
        catchError(error => of(new ImgDetailResultsFail(error)))
      )
    )
  );
}
