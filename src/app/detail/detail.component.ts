import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/http.service';
import { DestroyService } from '../services/destroy.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { finalize } from 'rxjs/internal/operators/finalize';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})

export class DetailComponent implements OnInit {
  isLoading$ = new BehaviorSubject<boolean>(false);
  data$ = new BehaviorSubject<any | null>(null);
  arr$ = new BehaviorSubject<any | null>(null);
 
  constructor(private route: ActivatedRoute, private httpService: HttpService, private destroyService$: DestroyService) { }

  ngOnInit(): void {
    this.route.queryParams
      .pipe(takeUntil(this.destroyService$))
      .subscribe(params => {
      this.isLoading$.next(true);
        this.httpService.getImage(params['id'])
        .pipe(finalize(() => { this.isLoading$.next(false); }))
        .subscribe(data => (this.data$.next(data), this.arr$.next((data.hits[0].tags).split(",").map((el: string) => el.trim()))));
      });
  }

  }



