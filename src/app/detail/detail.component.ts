import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailComponent implements OnInit {
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
