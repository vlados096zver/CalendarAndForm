import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {DaysMonth, DaysWeek} from "../models/сalendar.model";
import {Location} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  public daysOfWeek=  ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  public daysMonth: DaysMonth[] = [];
  public daysWeek: DaysWeek[] = [];

  private _currentDate: Date;
  public _currentDateSubject: BehaviorSubject<Date>;
  constructor(private location: Location) {
    this._currentDate = new Date();
    this._currentDateSubject = new BehaviorSubject<Date>(this._currentDate);
  }
   set currentDate(value: Date) {
    this._currentDate = value;
    this._currentDateSubject.next(value);
  }

  get currentDate(): Date {
    return this._currentDate;
  }

  get currentDate$(): Observable<Date> {
    return this._currentDateSubject.asObservable();
  }

  public generateMonth(): void {
    this.daysMonth = [];
    const currentDate = this.currentDate;
    const currentYear = currentDate.getFullYear();
    const currentNumberMonth = currentDate.getMonth()
    const firstDayOfMonth = new Date(currentYear, currentNumberMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentNumberMonth, 0);
    const firstDayOfWeek = firstDayOfMonth.getDay();

    const daysBefore = (firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1);
    const totalCells = 42;
    const daysAfter = totalCells - daysBefore - lastDayOfMonth.getDate();

    for (let i = 1 - daysBefore; i <= lastDayOfMonth.getDate() + daysAfter; i++) {
      const currentDay = new Date(currentYear, currentNumberMonth, i);
      const today = new Date();
      const day = String(currentDay.getDate()).padStart(2, '0');
      const month = String(currentDay.getMonth() + 1).padStart(2, '0');
      const year = currentDay.getFullYear();

      const dayInfo: DaysMonth = {
        id:  `${day}.${month}.${year}`,
        day: day,
        currentMonth: currentDay.getMonth() === currentNumberMonth,
        isToday: currentDay.getFullYear() === today.getFullYear() &&
          currentDay.getMonth() === today.getMonth() &&
          currentDay.getDate() === today.getDate()
      };
      this.daysMonth.push(dayInfo);
    }
  }
  public generateWeek(prevWeek?: boolean, nextWeek?: boolean): void {
    this.daysWeek = [];
    if (nextWeek) {
      this.currentDate.setDate(this.currentDate.getDate() + 7);
    }
    if (prevWeek) {
      this.currentDate.setDate(this.currentDate.getDate() - 7);
    }
    let currentDate = new Date(this.currentDate);
    let weekday = currentDate.getDay();
    let diff = currentDate.getDate() - weekday + (weekday === 0 ? -6 : 1);
    currentDate.setDate(diff);
    for (let i = 0; i < 7; i++) {
      const day = String(currentDate.getDate()).padStart(2, '0');
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const year = currentDate.getFullYear();
      const dayInfo: DaysWeek  =
        { id: `${day}.${month}.${year}`,
          day: day
        };
      this.daysWeek.push(dayInfo);
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }
  public increaseData(tab: number): void {
    if (tab == 0) {
      this.currentDate.setMonth(this.currentDate.getMonth() + 1);
      this.currentDate = new Date(this.currentDate);
      this.generateMonth()
    } else if (tab == 1) {
      this.generateWeek(false, true);
    } else {
      this.currentDate.setDate(this.currentDate.getDate() + 1);
      this.currentDate = new Date(this.currentDate);
    }
  }

  public decreaseData(tab: number): void {
     if (tab == 0) {
       this.currentDate.setMonth(this.currentDate.getMonth() - 1);
       this.currentDate = new Date(this.currentDate);
       this.generateMonth()
     } else if (tab == 1) {
       this.generateWeek(true, false);
     } else {
       this.currentDate.setDate(this.currentDate.getDate() - 1);
       this.currentDate = new Date(this.currentDate);
     }
  }
  public isValidDate(dateString: string): boolean {
    const [day, month, year] = dateString.split('.').map(Number);
    const dateObject = new Date(year, month - 1, day);
    return dateObject.getDate() === day && dateObject.getMonth() === month - 1 && dateObject.getFullYear() === year;
  }

  goBack(): void {
    this.location.back();
  }
}
