interface CalenderElementable {
  readonly date: number;
  readonly isInCurrentMonth: boolean;
  readonly events: string[];
}
interface Calenderable {
  readonly year: number;
  readonly month: number;
  readonly calenderElements: Array<CalenderElement>;
  firstDay(): string;
  daysOfMonthOfYear(): number;
  createCalenderElements(
    days: number,
    isIn: boolean,
    gap: number
  ): Array<CalenderElement>;
}

class CalenderElement implements CalenderElementable {
  private _events: string[] = [];
  constructor(readonly date: number, readonly isInCurrentMonth: boolean) {}
  get events(): string[] {
    return this._events;
  }
  set events(newEvents: string[]) {
    this._events = newEvents;
  }
}

const daysOfMonth = [31, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export class Calender implements Calenderable {
  private static instance: Calender;
  private _calenderElements: Array<CalenderElement> = [];
  private constructor(readonly year: number, readonly month: number) {}
  static getInstance(year: number, month: number): Calender {
    Calender.instance = new Calender(year, month);
    return Calender.instance;
  }
  firstDay(): string {
    return String(this.month) + ' 1, ' + String(this.year);
  }
  daysOfMonthOfYear(month: number = this.month): number {
    if (this.year % 4 === 0 && this.month === 2) {
      return 29;
    }
    return daysOfMonth[month];
  }
  prevMonth(): { year: number; month: number } {
    if (this.month === 1) {
      return { year: this.year - 1, month: 12 };
    }
    return { year: this.year, month: this.month - 1 };
  }
  nextMonth(): { year: number; month: number } {
    if (this.month === 12) {
      return { year: this.year + 1, month: 1 };
    }
    return { year: this.year, month: this.month + 1 };
  }
  createCalenderElements(
    days: number,
    isIn: boolean,
    gap = 1
  ): Array<CalenderElement> {
    return new Array(days)
      .fill(0)
      .map((_, i) => new CalenderElement(i + gap, isIn));
  }
  get calenderElements(): Array<CalenderElement> {
    const currentDays = this.daysOfMonthOfYear();
    const beforeDays = this.daysOfMonthOfYear(this.month - 1);
    const beforeEdgeDays = new Date(this.firstDay()).getDay();
    const afterEdgeDays = 42 - (beforeEdgeDays + currentDays);

    this._calenderElements = this.createCalenderElements(
      beforeEdgeDays,
      false,
      beforeDays - beforeEdgeDays + 1
    )
      .concat(this.createCalenderElements(currentDays, true))
      .concat(this.createCalenderElements(afterEdgeDays, false));

    return this._calenderElements;
  }
}

export const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
