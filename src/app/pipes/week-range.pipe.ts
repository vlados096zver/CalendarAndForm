
import { Pipe, PipeTransform } from '@angular/core';
import {DatePipe} from "@angular/common";
import {DateObject} from "../models/сalendar.model";

@Pipe({
  name: 'weekRange',
})

export class WeekRangePipe  implements PipeTransform {
  transform(value: Date, arr: DateObject[]): string {
    if (!value || !arr) {
      return '';
    }
    function getYearFromDate(dateObj: DateObject): number {
      return parseInt(dateObj.id.split('.')[2]);
    }

    function createDateFromDateString(dateString: string): Date {
      const [day, month, year] = dateString.split('.').map(Number);
      return new Date(year, month - 1, day);
    }
    const datePipe: DatePipe = new DatePipe('en-US');

    if (Array.isArray(arr) && arr.length > 0) {
      const firstElem = arr[0];
      const lastElem = arr[arr.length - 1];
      const firstElemYear = getYearFromDate(firstElem);
      const lastElemYear = getYearFromDate(lastElem);

      const firstDate = createDateFromDateString(firstElem.id);
      const lastDate = createDateFromDateString(lastElem.id);

      if (firstElemYear !== lastElemYear) {
        return `${datePipe.transform(firstDate, 'MMM dd, yyyy')} - ${datePipe.transform(lastDate, 'MMM dd, yyyy')}`;
      } else {
        return`${datePipe.transform(firstDate, 'MMM dd')} - ${datePipe.transform(lastDate, 'MMM dd, yyyy')}`;
      }
    } else {
      return '';
    }
  }
}
