import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import {NewEventLineComponent} from "../../components/new-event/new-event-line/new-event-line";
import {TableSettings} from "../../models/table.model";
import { Router} from '@angular/router';
import {CalendarService} from "../../services/calendar.service";
import {TableEventsService} from "../../services/table-events.service";
import {CustomDateFormatPipe} from "../../pipes/custom-format-date.pipe";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy  {
  private subscription!: Subscription;
  public customFormatDate = new CustomDateFormatPipe();
  public tabs = [
    {
      point: 'Month',
      id: 1
    },
    {
      point: 'Week',
      id: 2
    },
    {
      point: 'Day',
      id: 3
    }
  ];
  public activeTab = 0;

  public settingsTableEvents: TableSettings = {
    head: [
      {
        title: 'Title',
      },
      {
        title: 'Date',
      },
      {
        title: 'Save',
        maxWidth: 200,
      },
      {
        title: 'Delete',
        maxWidth: 200,
      },
    ]
  }

  constructor (
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    public router: Router,
    public calendarService: CalendarService,
    public tableEventsService: TableEventsService) {
  }

  ngOnInit() {
    this.calendarService.generateMonth();
    this.addNewEvent()
    this.subscription = this.calendarService.currentDate$.subscribe(newDate => {
      let value = this.customFormatDate.transform(this.calendarService.currentDate);
      if (value) {
        this.tableEventsService.eventsSubject.next(this.tableEventsService.getInfoDay(value))
      }
    })
  }
  public changeState(state: number) {
    if (this.activeTab == state) return;
    this.activeTab = state;
    if (this.activeTab == 0) {
       this.calendarService.generateMonth();
    }
    if (this.activeTab == 1) {
       this.calendarService.generateWeek();
    }
  }
  public addNewEvent() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(NewEventLineComponent);
    const componentRef = this.viewContainerRef.createComponent(componentFactory);
    componentRef.instance.componentRef = componentRef;
    componentRef.instance.settings = this.settingsTableEvents;
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
