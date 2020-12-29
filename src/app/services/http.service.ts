import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiData } from '../api-data';
import { Observable, throwError } from 'rxjs';
import { resultMemoize, Store } from '@ngrx/store';
import { DataActionTypes, DataActions, LoadSearchResults, LoadSearchResultsFail, LoadSearchResultsSuccess } from '../state/data/data.actions';
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

    this.store.dispatch(new LoadSearchResults());
    this.http.get<ApiData>(this.apiUrl, { params })
      .pipe(catchError((e) => {
        this.store.dispatch(new LoadSearchResultsFail(e))
        return throwError(e);
      } ))
      .subscribe((result) => this.store.dispatch(new LoadSearchResultsSuccess(result)))
  }

  getImage(imgId: any): void {
    const params = new HttpParams(
      {
      fromObject:
      {
        key: this.key,
        id: imgId,
      }}
    );

    this.store.dispatch(new LoadSearchResults());
    this.http.get<ApiData>(this.apiUrl, { params })
      .pipe(catchError((e) => {
        this.store.dispatch(new LoadSearchResultsFail(e))
        return throwError(e);
      }))
      .subscribe((result) => this.store.dispatch(new LoadSearchResultsSuccess(result)))
  }
}
