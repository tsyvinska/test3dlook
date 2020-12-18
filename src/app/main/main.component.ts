import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup} from '@angular/forms';
import { HttpService } from '../services/http.service';
import { DestroyService } from '../services/destroy.service';
import { debounceTime, finalize, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
 
  searchForm!: FormGroup;
  amountArray: number[] = [10, 20, 50, 100];
  data: any;
  isLoading: boolean = false;
  isEmpty: boolean | undefined;

  constructor(private HttpService: HttpService, private destroyService$: DestroyService, private router: Router, private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
     search: ['',],
     amount: ['20',],
    });

    //отслеживаем изменение значений формы
    this.searchForm.valueChanges.subscribe(val => {
      this.isEmpty = false;
      this.isLoading = true;
      
      if (val.search !== "") {
        
        this.HttpService.getRes(val.search, val.amount)
          .pipe(
          debounceTime(5000),
          takeUntil(this.destroyService$),
          finalize(() => {
            this.isLoading = false;
          })
            )
          .subscribe(data => this.data = data);
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




