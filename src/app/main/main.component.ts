import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { FormBuilder, FormGroup} from '@angular/forms';
import { HttpService } from '../services/http.service';

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

  constructor(private HttpService: HttpService, private router: Router, private fb: FormBuilder, ) { }

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
        this.HttpService.getRes(val.search, val.amount).subscribe(data => this.data = data);
        this.isLoading = false;
      }
      else {
        this.isLoading = false;
        this.isEmpty = true;
      } 
    })   
  }

  goToDetail(hit: any) {
    const url = this.router.serializeUrl(this.router.createUrlTree(['/img/detail', { imgUrl: hit }]));
    window.open(url, '_blank');
  }
  
}




