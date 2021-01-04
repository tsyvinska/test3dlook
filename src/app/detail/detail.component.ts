import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../services/http.service';
import { DestroyService } from '../services/destroy.service';
import { takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiData } from '../api-data';
import { GlobalState} from '../state/index';
import { Store, select } from '@ngrx/store';
import { getImgDetailLoader, getImgDetailResults, getImgDetailTages } from '../state/img-detail/img-detail.selector';
import { ImgDetailResults } from '../state/img-detail/img-detail.actions';


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
    this.isLoading$ = this.store.pipe(select(getImgDetailLoader));
    this.data$ = this.store.pipe(select(getImgDetailResults));
    this.tags$ = this.store.pipe(select(state => state.imgDetail.data.hits[0].tags.split(',').map((el: string) => el.trim())));
    //this.tags$ = this.store.pipe(select(getImgDetailTages).split(',').map((el: string) => el.trim())));

    this.route.queryParams
      .pipe(takeUntil(this.destroyService$))
      .subscribe(params => { this.store.dispatch(new ImgDetailResults({params})); }); }}



