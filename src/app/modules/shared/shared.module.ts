import {CustomDateFormatPipe} from "../../pipes/custom-format-date.pipe";
import {WeekRangePipe} from "../../pipes/week-range.pipe";
import {NewEventLineComponent} from "../../components/new-event/new-event-line/new-event-line";
import {NewEventHeadComponent} from "../../components/new-event/new-event-head/new-event-head";
import {InputLineComponent} from "../../components/inputs/input-line/input-line.component";
import {InputDateComponent} from "../../components/inputs/input-date/input-date.component";
import {TabsComponent} from "../../components/tabs/tabs.component";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonComponent} from "../../components/buttons/button/button.component";
import {MatNativeDateModule} from "@angular/material/core";
import {MatDatepickerModule} from "@angular/material/datepicker";

const components: any = [
  TabsComponent,
]

const inputs: any = [
  InputLineComponent,
  InputDateComponent
]

const table: any = [
  NewEventLineComponent,
  NewEventHeadComponent
]

const pipes: any = [
  CustomDateFormatPipe,
  WeekRangePipe
]

const buttons: any = [
  ButtonComponent
]

@NgModule({
  declarations: [
    ...components,
    ...inputs,
    ...table,
    ...pipes,
    ...buttons
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports: [
    ...components,
    ...inputs,
    ...table,
    ...pipes,
    ...buttons,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class SharedModule { }
