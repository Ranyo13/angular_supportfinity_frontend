import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './components/form/form.component'
import { HomeComponent } from './components/home/home.component'
const routes: Routes =  [ {path: '', component: HomeComponent},
                          {path: 'profile', component: FormComponent}
                         ];



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
