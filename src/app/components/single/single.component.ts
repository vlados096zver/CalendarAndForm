import {
  Component,
  Input
} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TableEventsService} from "../../services/table-events.service";
import {CalendarService} from "../../services/calendar.service";

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleComponent {
  private _info: any[] = [];

  @Input() set info(value: any[] | null) {
    if (value) {
      this._info = value;
    }
  }
  get info(): any[] | null  {
    return this._info;
  }
  public id: string | null;
  constructor (
    public activatedRoute: ActivatedRoute,
    public tableEventsService: TableEventsService,
    public calendarService: CalendarService,
    private router: Router) {
      this.id = this.activatedRoute.snapshot.paramMap.get('id');
      if (this.id) {
        if (this.calendarService.isValidDate(this.id)) {
          this.info = this.tableEventsService.getInfoDay(this.id);
        } else {
          this.router.navigate(['/']);
        }
      }
  }

  updateBlock(id: string, index: number) {
    this.tableEventsService.deleteEvent(id, index);
    const updatedInfo = this.tableEventsService.getInfoDay(id);
    this.info = updatedInfo ? updatedInfo : [];
  }


}
