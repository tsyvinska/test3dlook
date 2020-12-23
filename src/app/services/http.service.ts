import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiData } from '../api-data';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class HttpService {

  apiUrl = "https://pixabay.com/api/";
  key = "19551405-7629a3016c4b767ad74313939";

  constructor(private http: HttpClient) { }

  getRes(search_query: string, amount: string): Observable<ApiData> {   
    const params = new HttpParams({
      fromObject:
      {
        key: this.key,
        q: encodeURIComponent(search_query),
        per_page: amount,
      }
    });
    return (this.http.get<ApiData>(this.apiUrl, { params: params }))
  }

  getImage(imgId:any): Observable<ApiData> {
    const params = new HttpParams({
      fromObject:
      {
        key: this.key,
        id: imgId,
      }
    });
    return (this.http.get<ApiData>(this.apiUrl, { params: params }))
  }
}
