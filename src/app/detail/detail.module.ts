import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailRoutingModule } from './detail-routing.module';
import { DetailComponent } from './detail.component';
import { LoaderComponent } from './loader/loader.component';


@NgModule({
  declarations: [
    DetailComponent,
    LoaderComponent],
  imports: [
    CommonModule,
    DetailRoutingModule,
  ]
})
export class DetailModule { }
