import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup} from '@angular/forms';
import { DestroyService } from '../services/destroy.service';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { ApiData } from '../api-data';
import { BehaviorSubject, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { GlobalState } from '../state/index';
import { getLoader, getSearchResults } from '../state/search-result/search-result.selector';
import { LoadSearchResults } from '../state/search-result/search-result.actions';

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
    this.store.dispatch(new LoadSearchResults({ search, amount }));
    this.router.navigate([''], { queryParams: { search, amount } });
  }
}




