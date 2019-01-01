import { Component, ViewChild } from '@angular/core';
import {CalendarComponent} from 'angular-customizable-calendar/calendar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(CalendarComponent) myCalendar: CalendarComponent;
  viewTitle;
  eventSource = [];
  displayTime: Date;

  calendar = {
    mode: 'month',
    timeInterval: 30,
    startingDayMonth: 1,
    startingDayWeek: 1,
    startHour: 0,
    endHour: 24,
    locale: 'fr',
    formatDay: 'dd',
    formatDayHeader: 'EEEE',
    formatDayTitle: 'MM dd, yyyy',
    formatWeekTitle: 'MMMM yyyy, \'Week\' w',
    formatMonthTitle: 'MMMM yyyy',
    formatWeekViewDayHeader: 'EEE d',
    formatHourColumn: 'ha',
    allDayLabel: 'hello',
    noEventsLabel: 'hi',
    currentDate: new Date(),
    queryMode: 'local',
    dateFormatter: {
      formatMonthViewDay: function (date: Date) {
        return date.getDate().toString();
      },
      formatMonthViewDayHeader: function (date: Date) {
        return 'testMDH';
      },
      formatMonthViewTitle: function (date: Date) {
        return 'testMT';
      },
      formatWeekViewDayHeader: function (date: Date) {
        return 'testWDH';
      },
      formatWeekViewTitle: function (date: Date) {
        return 'testWT';
      },
      formatWeekViewHourColumn: function (date: Date) {
        return 'testWH';
      },
      formatDayViewHourColumn: function (date: Date) {
        return 'testDH';
      },
      formatDayViewTitle: function (date: Date) {
        return 'testDT';
      }
    }
  };

  loadEvents() {
    this.eventSource = this.createRandomEvents();
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  previous() {
    this.myCalendar.previous();
  }

  next() {
    this.myCalendar.next();
  }

  onEventSelected(event) {
    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
  }

  changeMode(mode) {
    this.calendar.mode = mode;
  }

  today() {
    this.calendar.currentDate = new Date();
  }

  onTimeSelected(ev) {
    console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' + (ev.events !== undefined && ev.events.length !== 0)
      + ', disabled: ' + ev.disabled);
  }

  onCurrentDateChanged(event: Date) {
    this.displayTime = new Date(event.getTime());
  }

  createRandomEvents() {
    const events = [];
    for (let i = 0; i < 50; i += 1) {
      const date = new Date();
      const eventType = Math.floor(Math.random() * 2);
      const startDay = Math.floor(Math.random() * 90) - 45;
      let endDay = Math.floor(Math.random() * 2) + startDay;
      let startTime;
      let endTime;
      if (eventType === 0) {
        startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
        if (endDay === startDay) {
          endDay += 1;
        }
        endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
        events.push({
          title: 'All Days - ' + i,
          startTime: startTime,
          endTime: endTime,
          allDay: true
        });
      } else {
        const startMinute = Math.floor(Math.random() * 24 * 60);
        const endMinute = Math.floor(Math.random() * 180) + startMinute;
        startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
        endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
        events.push({
          title: 'Events - ' + i,
          startTime: startTime,
          endTime: endTime,
          allDay: false,
        });
      }
    }

    return events;
  }

  onRangeChanged(ev) {
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }

  markDisabled = (date: Date) => {
    const current = new Date();
    return date < current;
  }
}
