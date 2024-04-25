import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {EventsTable} from "../models/сalendar.model";
import {CalendarService} from "./calendar.service";
import {CustomDateFormatPipe} from "../pipes/custom-format-date.pipe";


@Injectable({
  providedIn: 'root'
})
export class TableEventsService {
  public customFormatDate = new CustomDateFormatPipe();
  public eventsSubject: BehaviorSubject<any>;
  constructor(public calendarService: CalendarService) {
    this.eventsSubject = new BehaviorSubject<EventsTable[] | []>(this.getInfoDay(this.customFormatDate.transform(this.calendarService.currentDate)));
  }

  public static readonly CALENDAR_EVENTS = 'calendar_events';

  getAllCalendarEvents(): any {
    const settingsJSON = localStorage.getItem(TableEventsService.CALENDAR_EVENTS);
    if (settingsJSON) {
      try {
        return JSON.parse(settingsJSON);
      } catch (err) {
        console.error('Error parsing JSON:', err);
      }
    }
    return {};
  }

  getInfoDay(id: string): EventsTable[] | [] {
    const settingsParsed = this.getAllCalendarEvents();

    if (!!settingsParsed[id] && typeof settingsParsed[id] === 'object' && settingsParsed[id] !== null) {
      return settingsParsed[id];
    }
    return [];
  }

  saveEvent(id: string, text: string): void {
    const settingsParsed = this.getAllCalendarEvents();

    if (!settingsParsed[id] || !Array.isArray(settingsParsed[id])) {
      settingsParsed[id] = [];
    }
    const events = settingsParsed[id];
    const existingEvent = events.find((event: EventsTable) => event.value === text);
    if (!existingEvent) {
      events.push({ value: text });
      localStorage.setItem(TableEventsService.CALENDAR_EVENTS, JSON.stringify(settingsParsed));
    }

    const initValue = new Date(this.calendarService.currentDate.setHours(0, 0, 0, 0))
    const [day, month, year] = id.split('.').map(Number);

    const currentValue = new Date(year, month - 1, day);
    if (currentValue.getTime() !== initValue.getTime()) return;
    this.eventsSubject.next(events);
  }

  deleteEvent(id: string, index: number): void {
     let localStorageData = this.getAllCalendarEvents()
     if (localStorageData[id] && localStorageData[id][index]) {
      localStorageData[id].splice(index, 1);
     }
    localStorage.setItem(
      TableEventsService.CALENDAR_EVENTS,
      JSON.stringify(localStorageData)
    );
  }

}
