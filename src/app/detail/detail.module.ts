import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailRoutingModule } from './detail-routing.module';
import { DetailComponent } from './detail.component';
import { LoaderModule } from '../loader/loader.module';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    DetailComponent
  ],
  imports: [
    CommonModule,
    DetailRoutingModule,
    LoaderModule,
    PipesModule
  ]
})
export class DetailModule { }
