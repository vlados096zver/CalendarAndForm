import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-day-info',
  templateUrl: './day-info.component.html',
  styleUrls: ['./day-info.component.scss']
})

export class DayInfoComponent {

  @Input() item: any = [];
  public gotoDay(day: string) {
    if (day) {
     this.router.navigate([day]);
    }
  }
  constructor ( public router: Router) { }

}
