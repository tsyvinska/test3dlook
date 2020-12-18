import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})

export class HttpService {

  apiUrl = "https://pixabay.com/api/";

  constructor(private http: HttpClient) { }

  getRes(search_query: any, amount: any) {
    
    const params = new HttpParams({
      fromObject:
      {
        key: "19551405-7629a3016c4b767ad74313939",
        q: encodeURIComponent(search_query),
        per_page: amount,
      }
    });

    return (this.http.get(this.apiUrl, { params: params }))
  }

}
