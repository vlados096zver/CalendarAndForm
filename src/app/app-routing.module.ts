import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {SingleComponent} from "./components/single/single.component";
import {FormComponent} from "./pages/form/form.component";

const routes: Routes = [
  {
    path: 'form',
    component: FormComponent,
  },
  {
    path: '',
    component: MainPageComponent,
  },
  {
    path: ':id',
    component: SingleComponent,
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
