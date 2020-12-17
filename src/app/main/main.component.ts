import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  apiUrl = "https://pixabay.com/api/";

  amountArray: number[] = [10, 20, 50, 100];
  //amount:any;
  data:any;
  totalHits: any;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {

  }

  getRes(search_query: any, amount: any) {
    if (search_query=="") {
      return
    }
    const params = new HttpParams({
      fromObject:
      {
        key: "19551405-7629a3016c4b767ad74313939",
        q: encodeURIComponent(search_query),
        per_page: amount,
      }
    });

    this.http.get(this.apiUrl, { params: params })
      .subscribe(data => this.data = data);
  }

  goToDetail(hit: any) {
    const url = this.router.serializeUrl(this.router.createUrlTree(['/img/detail', { imgUrl: hit }]));
    window.open(url, '_blank');
  }
  
}




