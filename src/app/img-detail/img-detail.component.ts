import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-img-detail',
  templateUrl: './img-detail.component.html',
  styleUrls: ['./img-detail.component.scss']
})
export class ImgDetailComponent implements OnInit {
  imgUrl: string | null | undefined;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.imgUrl = this.route.snapshot.paramMap.get('imgUrl');
  }

}
