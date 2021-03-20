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
      dayOfWeek,
      selectDate,
      monthsInAdvance,
      currentYear,
    } = this.props;

    console.log('crrent date: ', typeof currentDate);
    let weekdayNameDivs = [];
    let allDates;
    let combinedCalendars = [];
    let currentMonthIndex = Number(currentMonth) - 1;

    weekdayNames.forEach((day, index) =>
      weekdayNameDivs.push(<div key={index}>{day}</div>)
    );

    // returns current month as only option to book
    if (monthsInAdvance === 0) {
      allDates = new Array(this.props.days);

      for (let date = 0; date <= this.props.days; date++) {
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
      let allowedBookingMonths = [];

      while (counter < monthsInAdvance) {
        allDates = new Array(this.props.days);

        for (let date = 1; date <= this.props.days; date++) {
          allDates.push(
            <button
              disabled={
                Number(currentMonth) - 1 === currentMonthIndex &&
                date < Number(currentDate)
                  ? true
                  : false
              }
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

        allowedBookingMonths.push([
          <div className="month-name-container" key={months[currentMonthIndex]}>
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
        ]);
        currentMonthIndex++;
        if (currentMonthIndex > 12) {
          currentMonthIndex = 0;
        }
        counter++;
      }

      allowedBookingMonths.forEach((formattedMonth, index) =>
        combinedCalendars.push(
          <div className="full-month-container" key={index}>
            {formattedMonth}
          </div>
        )
      );
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
