
export interface DateObject {
  id: string;
  day: string;
}

export interface DaysMonth {
  id: string;
  day: string;
  currentMonth: boolean
  isToday: boolean
}

export interface DaysWeek {
  id: string;
  day: string;
}

export interface EventsTable {
  value: string;
}
