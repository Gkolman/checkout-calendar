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
      selectDate,
      monthsInAdvance,
    } = this.props;

    console.log('crrent date type: ', typeof dayOfWeek);
    console.log('crrent date: ', dayOfWeek);

    let weekdayNameDivs = [];
    let allDates;
    let lastDayOfMonth;
    let dayOfWeekForButtonsIndex = weekdayNames.indexOf(dayOfWeek);
    let combinedCalendars = [];
    let datesInMonth;
    let currentMonthIndex = Number(currentMonth) - 1;

    weekdayNames.forEach((day, index) =>
      weekdayNameDivs.push(<div key={index}>{day}</div>)
    );

    // returns current month as only option to book
    if (monthsInAdvance === 0) {
      datesInMonth = ['1', '3', '5', '7', '8', '10', '12'].includes(
        currentMonth
      )
        ? 31
        : 30;
      if (currentMonth === '2') {
        datesInMonth = 28;
      }

      allDates = new Array(datesInMonth);

      for (let date = 0; date <= datesInMonth; date++) {
        allDates[date] = (
          <button
            disabled={date < Number(currentDate) ? true : false}
            key={date}
            name={new Date(
              currentYear,
              currentMonthIndex,
              date
            ).toLocaleDateString()}
            onClick={selectDate}
          >
            {date}
          </button>
        );
      }
      combinedCalendars.push(
        <div className="full-month-container" key={months[currentMonthIndex]}>
          {[
            <div
              className="month-name-container"
              key={months[currentMonthIndex]}
            >
              {months[currentMonthIndex]}
            </div>,
            <div
              className="weekday-names-container"
              key={months[currentMonthIndex] + 'weekdays'}
            >
              {weekdayNameDivs}
            </div>,
            <div
              className="date-container"
              key={months[currentMonthIndex] + 'dates'}
            >
              {allDates}
            </div>,
          ]}
        </div>
      );
    } else {
      let counter = 0;
      while (counter < Number(monthsInAdvance)) {
        if (currentMonth === currentMonthIndex + 1 + '') {
          datesInMonth = ['1', '3', '5', '7', '8', '10', '12'].includes(
            currentMonth
          )
            ? 31
            : 30;
          if (currentMonth === '2') {
            datesInMonth = 28;
          }

          allDates = new Array(datesInMonth);

          for (let date = 0; date <= datesInMonth; date++) {
            allDates[date] = (
              <button
                disabled={date < Number(currentDate) ? true : false}
                key={date}
                name={new Date(
                  currentYear,
                  currentMonthIndex,
                  date
                ).toLocaleDateString()}
                onClick={selectDate}
              >
                {date}
              </button>
            );
            dayOfWeekForButtonsIndex++;
            if (dayOfWeekForButtonsIndex > 6) {
              dayOfWeekForButtonsIndex = 0;
            }
            if (date === datesInMonth) {
              console.log(`lastDayOfMonth: ${date} type: ${typeof date}`);
              console.log(
                `current date / start: ${currentDate} type: ${typeof currentDate} day of week: ${dayOfWeek}`
              );
              console.log(
                `index of current date / start date of week: ${weekdayNames.indexOf(
                  dayOfWeek
                )}`
              );
              console.log(
                `difference between last and start: ${
                  date - Number(currentDate)
                }`
              );
              console.log(
                `button weekday index at end: ${dayOfWeekForButtonsIndex}`
              );
              console.log(`this month should end on this day: ${weekdayNames[dayOfWeekForButtonsIndex]}`)
              console.log(`next month should start on this day: ${weekdayNames[dayOfWeekForButtonsIndex + 1]}`)
            }
          }

          combinedCalendars.push(
            <div
              className="full-month-container"
              key={months[currentMonthIndex]}
            >
              {[
                <div
                  className="month-name-container"
                  key={months[currentMonthIndex]}
                >
                  {months[currentMonthIndex]}
                </div>,
                <div
                  className="weekday-names-container"
                  key={months[currentMonthIndex] + 'weekdays'}
                >
                  {weekdayNameDivs}
                </div>,
                <div
                  className="date-container"
                  key={months[currentMonthIndex] + 'dates'}
                >
                  {allDates}
                </div>,
              ]}
            </div>
          );
        } else {
          datesInMonth = ['1', '3', '5', '7', '8', '10', '12'].includes(
            Number(currentMonthIndex) + 1 + ''
          )
            ? 31
            : 30;
          if (Number(currentMonthIndex) + 1 + '' === '2') {
            datesInMonth = 28;
          }

          allDates = new Array(datesInMonth);
          for (let date = 1; date <= datesInMonth; date++) {
            if (date < dayOfWeekForButtonsIndex + 2) {
              allDates[date] = (
                <button
                  disabled={true}
                  key={date}
                  name={new Date(
                    currentYear,
                    currentMonthIndex,
                    date
                  ).toLocaleDateString()}
                  onClick={selectDate}
                ></button>
              );
              datesInMonth++;
              continue;
            }

            allDates[date] = (
              <button
                disabled={false}
                key={date - dayOfWeekForButtonsIndex - 1}
                name={new Date(
                  currentYear,
                  currentMonthIndex,
                  date - dayOfWeekForButtonsIndex - 1
                ).toLocaleDateString()}
                onClick={selectDate}
              >
                {date - dayOfWeekForButtonsIndex - 1}
              </button>
            );
          }

          combinedCalendars.push(
            <div
              className="full-month-container"
              key={months[currentMonthIndex]}
            >
              {[
                <div
                  className="month-name-container"
                  key={months[currentMonthIndex]}
                >
                  {months[currentMonthIndex]}
                </div>,
                <div
                  className="weekday-names-container"
                  key={months[currentMonthIndex] + 'weekdays'}
                >
                  {weekdayNameDivs}
                </div>,
                <div
                  className="date-container"
                  key={months[currentMonthIndex] + 'dates'}
                >
                  {allDates}
                </div>,
              ]}
            </div>
          );
        }

        counter++;
        currentMonthIndex++;
      }
    }

    // <div id="display-month">{allowedBookingMonths}</div>
    // <div id="weekday-names">{weekdayNameDivs}</div>
    // <div id="all-dates">{allDates}</div>
    return (
      <div>
        {/* <div className="carousel">
          <button className="carousel-button"></button>
          <div className="carousel-track-container">
            <ul className="carousel-track">{allowedBookingMonths}</ul>
          </div>
          <button className="carousel-button"></button>
        </div> */}
        {combinedCalendars}
      </div>
    );
  }
}

export default Dates;
