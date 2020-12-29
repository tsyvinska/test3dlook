import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiData } from '../api-data';
import { throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { LoadSearchResults, LoadSearchResultsFail, LoadSearchResultsSuccess } from '../state/search-result/search-result.actions';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class HttpService {

  apiUrl = 'https://pixabay.com/api/';
  key = '19551405-7629a3016c4b767ad74313939';

  constructor(private http: HttpClient, private store: Store<any>) { }

  getRes(searchQuery: string, amount: string): void {
    const params = new HttpParams({
      fromObject:
      {
        key: this.key,
        q: encodeURIComponent(searchQuery),
        per_page: amount,
      }});
    this.dispatchSearchRes(params);
  }

  getImage(imgId: any): void {
    const params = new HttpParams(
      {
      fromObject:
      {
        key: this.key,
        id: imgId,
      }});
    this.dispatchSearchRes(params);
  }

  dispatchSearchRes(params: HttpParams) {
    this.store.dispatch(new LoadSearchResults());
    this.http.get<ApiData>(this.apiUrl, { params })
      .pipe(catchError((e) => {
        this.store.dispatch(new LoadSearchResultsFail(e))
        return throwError(e);
      }))
      .subscribe((result) => this.store.dispatch(new LoadSearchResultsSuccess(result)))
  }

}
