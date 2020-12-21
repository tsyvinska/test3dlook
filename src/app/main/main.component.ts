import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router} from '@angular/router';
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
  isLoading: boolean = false;
  isEmpty: boolean | undefined;

  constructor(private httpService: HttpService, private destroyService$: DestroyService, private router: Router, private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
     search: ['',],
     amount: ['20',],
    });

    //отслеживаем изменение значений формы
    this.searchForm.valueChanges.pipe(debounceTime(1500),takeUntil(this.destroyService$))
      .subscribe(val => {
      this.isEmpty = false;
      if (val.search !== "") {
        this.isLoading = true;
        this.httpService.getRes(val.search, val.amount)
        .pipe(finalize(() => { this.isLoading = false; }))
        .subscribe(data => this.data$.next(data));
      }
      else {
        this.isEmpty = true;
      } 
    })   
  }

  goToDetail(largeImageURL: string) {
    const url = this.router.serializeUrl(this.router.createUrlTree(['/img/detail', { imgUrl: largeImageURL }]));
    window.open(url, '_blank');
  }
  
}




