import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ImgDetailComponent } from './img-detail/img-detail.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  { path: 'img/detail', component: ImgDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
