import React from 'react';
import './Dates.css';
import { weekdayNames } from './weekdayNames';
import { months } from '../../../calendarMonths.js';

class Dates extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      currentDate,
      currentMonth,
      currentYear,
      dayOfWeek,
      monthsInAdvance,
      selectDate,
      changeSlider,
      sliderPosition,
      direction,
      checkInDate,
      checkOutDate,
    } = this.props;

    let currentCalendarTitle;
    let allDates;
    let fullCalendar;
    let lastDayOfMonth;
    let datesInMonth;
    let weekdayNameDivs = [];
    let dayOfWeekForButtonsIndex = weekdayNames.indexOf(dayOfWeek);
    let combinedCalendars = [];
    let currentMonthIndex = Number(currentMonth) - 1;
    let counter = 0;

    // HELPER FUNCTIONS
    const createCalendar = (calendarTitle, formattedDates) => {
      let calendar = [];
      calendar.push(
        <div
          className="full-month-dates-container"
          key={months[currentMonthIndex]}
        >
          {[calendarTitle, formattedDates]}
        </div>
      );
      return calendar; // array
    };

    const createCalendarTitle = (monthIndex) => {
      return (
        <div
          className="month-name-container"
          key={months[monthIndex] + currentYear}
        >
          <div className="slider">
            <button
              id="left-slider-button"
              name="left"
              onClick={changeSlider}
              disabled={sliderPosition === 0 ? true : false}
            >
              <i name="left" className="fas fa-angle-left fa-2x"></i>
            </button>
          </div>

          <div
            className={
              !direction
                ? 'slideable'
                : direction === 'left'
                ? 'slideable--left'
                : 'slideable--right'
            }
          >
            {months[monthIndex] + ' ' + currentYear}
          </div>
          <div className="slider">
            <button
              id="right-slider-button"
              name="right"
              onClick={changeSlider}
              disabled={sliderPosition === monthsInAdvance - 1 ? true : false}
            >
              <i name="right" className="fas fa-angle-right fa-2x"></i>
            </button>
          </div>
        </div>
      );
    };

    const determineMonthsInDays = (monthIndex) => {
      let datesInMonth = ['1', '3', '5', '7', '8', '10', '12'].includes(
        currentMonth
      )
        ? 31
        : 30;
      if (currentMonth === '2') {
        datesInMonth = 28;
      }
      return datesInMonth;
    };

    const determineMonthStartDayOfWeek = (howManyDaysInMonth) => {
      if (howManyDaysInMonth === 31) {
        dayOfWeekForButtonsIndex += 3;
      } else if (howManyDaysInMonth === 30) {
        dayOfWeekForButtonsIndex += 2;
      } else {
        dayOfWeekForButtonsIndex += 1;
      }

      if (dayOfWeekForButtonsIndex >= 7) {
        dayOfWeekForButtonsIndex -= 7;
      }
    };

    const createDates = (
      howManyDaysInMonth,
      dayOfWeekStart,
      inCurrentMonth
    ) => {
      let nullDaysTracker = 0;
      let allDatesInMonth = new Array(howManyDaysInMonth);
      allDatesInMonth = [...allDatesInMonth];

      for (let eachDate = 1; eachDate < howManyDaysInMonth + 1; eachDate++) {
        let buttonName = new Date(
          currentYear,
          currentMonthIndex,
          eachDate
        ).toLocaleDateString();

        let dateSelected = buttonName === checkInDate ? true : buttonName === checkOutDate ? true : false;

        if (inCurrentMonth) {
          if (nullDaysTracker < dayOfWeekStart) {
            allDatesInMonth[nullDaysTracker] = (
              <div>
                <button
                  key={
                    weekdayNames[dayOfWeekStart] +
                    '-nulled-' +
                    months[currentMonthIndex] +
                    '-' +
                    nullDaysTracker +
                    '-'
                  }
                  disabled={true}
                  className="dates--disabled"
                ></button>
              </div>
            );
            nullDaysTracker++;
            eachDate--;
            continue;
          }
          allDatesInMonth[eachDate] = (
            <div>
              <button
                key={new Date(
                  currentYear,
                  currentMonthIndex,
                  eachDate
                ).toLocaleDateString()}
                name={buttonName}
                onClick={selectDate}
                disabled={eachDate < Number(currentDate) ? true : false}
                className={
                  eachDate < Number(currentDate) ? 'dates--disabled' : dateSelected ? 'dates--clicked' : 'dates'
                }
              >
                {eachDate}
              </button>
            </div>
          );
        } else {
          if (nullDaysTracker < dayOfWeekStart) {
            allDatesInMonth[nullDaysTracker] = (
              <div>
                <button
                  key={
                    weekdayNames[dayOfWeekStart] +
                    '-nulled-' +
                    months[currentMonthIndex] +
                    '-' +
                    nullDaysTracker +
                    '-'
                  }
                  disabled={true}
                  className="dates--disabled"
                ></button>
              </div>
            );
            nullDaysTracker++;
            eachDate--;
            continue;
          }
          allDatesInMonth[dayOfWeekStart + eachDate + 6] = (
            <button
              key={new Date(
                currentYear,
                currentMonthIndex,
                eachDate
              ).toLocaleDateString()}
              name={buttonName}
              onClick={selectDate}
              className={dateSelected ? 'dates--clicked' : 'dates'}
            >
              {eachDate}
            </button>
          );
        }
      }

      determineMonthStartDayOfWeek(howManyDaysInMonth);

      return (
        <div>
          <div
            className="weekdays-dates-container"
            key={
              months[currentMonthIndex] +
              ' weeknamesOnly ' +
              dayOfWeekForButtonsIndex
            }
          >
            {[...weekdayNameDivs]}
          </div>
          <div
            className={
              !direction
                ? 'weekdays-dates-container'
                : direction === 'left'
                ? 'weekdays-dates-container slideable--left'
                : 'weekdays-dates-container slideable--right'
            }
            key={
              months[currentMonthIndex] +
              ' weeknamesDates ' +
              dayOfWeekForButtonsIndex
            }
          >
            {allDatesInMonth}
          </div>
        </div>
      ); // arr
    };

    // END HELPER FUNCTIONS

    weekdayNames.forEach((day, index) =>
      weekdayNameDivs.push(<div key={index}>{day.slice(0, 2)}</div>)
    );

    // returns current month as only option to book
    if (monthsInAdvance === 0) {
      datesInMonth = determineMonthsInDays(currentMonthIndex);
      currentCalendarTitle = createCalendarTitle(currentMonthIndex);
      allDates = createDates(datesInMonth, dayOfWeekForButtonsIndex, true);
      fullCalendar = createCalendar(currentCalendarTitle, allDates);

      combinedCalendars.push(fullCalendar);
    } else {
      // !!! START OF DISPLAYING ALL CALENDAR MONTHS FOR LISTINGS THAT ALLOW FOR LARGE ADVANCED BOOKINGS !!!
      while (counter < Number(monthsInAdvance)) {
        // CURRENT MONTH FOR MULTI MONTH ALLOWED BOOKINGS
        if (currentMonth === currentMonthIndex + 1 + '') {
          datesInMonth = determineMonthsInDays(currentMonthIndex);
          currentCalendarTitle = createCalendarTitle(currentMonthIndex);
          allDates = createDates(datesInMonth, dayOfWeekForButtonsIndex, true);
          fullCalendar = createCalendar(currentCalendarTitle, allDates);

          combinedCalendars.push(fullCalendar);
        } else {
          // MULTI MONTH ALLOWED BOOKINGS START OF FUTURE MONTHS
          datesInMonth = determineMonthsInDays(currentMonthIndex);
          currentCalendarTitle = createCalendarTitle(currentMonthIndex);
          allDates = createDates(datesInMonth, dayOfWeekForButtonsIndex);
          fullCalendar = createCalendar(currentCalendarTitle, allDates);

          combinedCalendars.push(fullCalendar);
        }
        counter++;
        currentMonthIndex++;
      }
    }

    return <div className="carousel">{combinedCalendars[sliderPosition]}</div>;
  }
}

export default Dates;
