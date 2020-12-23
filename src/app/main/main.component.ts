import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup} from '@angular/forms';
import { HttpService } from '../services/http.service';
import { DestroyService } from '../services/destroy.service';
import { debounceTime, finalize, takeUntil } from 'rxjs/operators';
import { ApiData } from '../api-data';
import { BehaviorSubject, Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {
 
  searchForm!: FormGroup;
  amountArray: string[] = ["10", "20", "50", "100"];
  data$ = new BehaviorSubject<ApiData | null>(null);
  isLoading$ = new BehaviorSubject<boolean>(false);
  isEmpty$ = new BehaviorSubject<boolean>(false);
  query: string="";
  amount: string="20";

  constructor(private httpService: HttpService,
              private destroyService$: DestroyService,
              private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder) {
    if (this.route.snapshot.queryParamMap.get('search')) {
    this.query = this.route.snapshot.queryParamMap.get('search');
    this.amount = this.route.snapshot.queryParamMap.get('amount');
    this.doSearch(this.query, this.amount);
    }
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      search: [this.query,],
      amount: [this.amount,],
    });

    //отслеживаем изменение значений формы
    this.searchForm.valueChanges.pipe(debounceTime(1500),takeUntil(this.destroyService$))
      .subscribe(val => {
      this.isEmpty$.next(false);
        if (val.search !== "") {         
          this.doSearch(val.search, val.amount)
        }
        else {
          this.isEmpty$.next(true);
        }
      })   
  }

  doSearch(search: string, amount: string) {
    this.isLoading$.next(true);
    this.httpService.getRes(search, amount)
      .pipe(finalize(() => { this.isLoading$.next(false); }))
      .subscribe(data => this.data$.next(data));
    this.router.navigate([''], { queryParams: { search: search, amount: amount } })
  }

  
}




