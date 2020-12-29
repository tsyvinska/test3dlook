import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup} from '@angular/forms';
import { HttpService } from '../services/http.service';
import { DestroyService } from '../services/destroy.service';
import { debounceTime, finalize, takeUntil } from 'rxjs/operators';
import { ApiData } from '../api-data';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { rootReducer, GlobalState, Actions } from '../state/reducers';
import { getLoader, getSearchResults } from '../state/data/data.selector';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
})
export class MainComponent implements OnInit {
  searchForm!: FormGroup;
  amountArray: string[] = ['10', '20', '50', '100'];
  loader$: Observable<boolean>;
  data$: Observable<ApiData>;
  isEmpty$ = new BehaviorSubject<boolean>(false);

  constructor(
    private store: Store<GlobalState>,
    private httpService: HttpService,
    private destroyService$: DestroyService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loader$ = this.store.pipe(select(getLoader));
    this.data$ = this.store.pipe(select(getSearchResults));

    if (this.route.snapshot.queryParamMap.get('search')) {
      this.doSearch(this.route.snapshot.queryParamMap.get('search'), this.route.snapshot.queryParamMap.get('amount') || '20');
    }

    this.searchForm = this.fb.group ({
      search: [this.route.snapshot.queryParamMap.get('search') || '', ],
      amount: [this.route.snapshot.queryParamMap.get('amount') || '20', ],
    });

   // отслеживаем изменение значений формы
    this.searchForm.valueChanges.pipe(debounceTime(1500), takeUntil(this.destroyService$))
      .subscribe(val => {
        this.isEmpty$.next(false);
        if (val.search !== '') {
          this.doSearch(val.search, val.amount);
        }
        else {
          this.isEmpty$.next(true);
        }
      });
  }

  doSearch(search: string, amount: string): void {
    this.httpService.getRes(search, amount)
    this.router.navigate([''], { queryParams: { search, amount } });
  }
}




