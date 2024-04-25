import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DayInfoComponent} from "./components/day-info/day-info.component";
import {SingleComponent} from "./components/single/single.component";
import {FormComponent} from "./pages/form/form.component";
import * as moment from 'moment';
import {SharedModule} from "./modules/shared/shared.module";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MomentDateAdapter} from "@angular/material-moment-adapter";

export const FORMATS_DATE = {
  parse: {
    dateInput: 'DD.MM.YYYY',
  },
  display: {
    dateInput: 'DD.MM.YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

moment.updateLocale('en', {
  week: {
    dow: 1
  }
});


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    DayInfoComponent,
    SingleComponent,
    FormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: FORMATS_DATE},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
