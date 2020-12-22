import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-img-detail',
  templateUrl: './img-detail.component.html',
  styleUrls: ['./img-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImgDetailComponent implements OnInit {
  imgUrl: string | null | undefined;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    //this.imgUrl = this.route.snapshot.params.imgUrl;
    //this.imgUrl = this.route.snapshot.paramMap.get('imgUrl');
  
    this.route.queryParams.subscribe(params => {
      this.imgUrl = params['imgUrl'];
    });
  }

}
