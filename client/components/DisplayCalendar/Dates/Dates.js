import React from 'react';
import './Dates.css';
import { weekdayNames } from './weekdayNames';
import { months } from '../../../calendarMonths.js';

class Dates extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { currentMonth, selectDate, monthsInAdvance, currentYear } = this.props;
    let weekdayNameDivs;
    let allDates;

    let currentMonthIndex = Number(currentMonth) - 1;
    let counter = 0;

    let allowedBookingMonths = [];
    while (counter < monthsInAdvance) {
      weekdayNameDivs = [];
      weekdayNames.forEach((day, index) => weekdayNameDivs.push(day));

      allDates = [];
      for (let date = 1; date <= this.props.days; date++) {
        allDates.push(
          <button
            key={date}
            name={new Date(currentYear, currentMonthIndex, date).toLocaleDateString()}
            onClick={selectDate}
          >
            {date}
          </button>
        );
      }
      allowedBookingMonths.push([months[currentMonthIndex], weekdayNameDivs, allDates]);
      currentMonthIndex++;
      if (currentMonthIndex > 12) {
        currentMonthIndex = 0;
      }
      counter++;
    }





    let combinedCalendars = [];
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
        {allowedBookingMonths}
      </div>
    );
  }
}

export default Dates;
