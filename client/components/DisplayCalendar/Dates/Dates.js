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

    console.log('crrent date: ',  currentMonth);
    let weekdayNameDivs = [];
    let allDates;
    let lastDayOfMonth;
    let combinedCalendars = [];
    let datesInMonth;
    let currentMonthIndex = Number(currentMonth) - 1;

    weekdayNames.forEach((day, index) =>
      weekdayNameDivs.push(<div key={index}>{day}</div>)
    );

    // returns current month as only option to book
    if (monthsInAdvance === 0) {
      console.log(
        `
        current month: ${currentMonth}
        current month index already 0 indexed (-1): ${currentMonthIndex}
        `)

      datesInMonth = ['1', '3', '5', '7', '8', '10', '12'].includes(currentMonth) ? 31 : 30;
      if (currentMonth === '2') { datesInMonth = 28; };

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
