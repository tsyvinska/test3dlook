import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StringToArrayPipe } from '../pipes/stringToArrayPipe';

@NgModule({
  declarations: [StringToArrayPipe],
  imports: [
    CommonModule,
  ],
  exports: [
    StringToArrayPipe
  ]
})
export class PipesModule { }
