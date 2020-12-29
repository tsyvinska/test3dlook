import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/http.service';
import { DestroyService } from '../services/destroy.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Observable } from 'rxjs';
import { ApiData } from '../api-data';
import { rootReducer, GlobalState} from '../state/reducers';
import { Store, select } from '@ngrx/store';
import { getLoader, getSearchResults, getTages } from '../state/search-result/search-result.selector';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})

export class DetailComponent implements OnInit {
  isLoading$: Observable<boolean>;
  tags$: Observable<any>;
  data$: Observable<ApiData>;

  constructor(
    private store: Store<GlobalState>,
    private route: ActivatedRoute,
    private httpService: HttpService,
    private destroyService$: DestroyService) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.pipe(select(getLoader));
    this.data$ = this.store.pipe(select(getSearchResults));
    //this.tags$ = this.store.pipe(select(getTages)).split(',').map((el: string) => el.trim());
    this.tags$ = this.store.pipe(select(state => state.search.data.hits[0].tags.split(',').map((el: string) => el.trim())));

    this.route.queryParams
      .pipe(takeUntil(this.destroyService$))
      .subscribe(params => {
     this.httpService.getImage(params.id)
      });
  }
  }



