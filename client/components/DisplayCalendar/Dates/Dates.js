import React from 'react';
import { weekdayNames } from './weekdayNames';
import { months } from '../../../calendarMonths.js';

class Dates extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { currentMonth, selectDate, monthsInAdvance } = this.props;

    let currentMonthIndex = Number(currentMonth);
    let counter = 0;

    let allowedBookingMonths = [];
    while (counter < monthsInAdvance) {
      allowedBookingMonths.push(months[currentMonthIndex]);
      currentMonthIndex++;
      if (currentMonthIndex > 12) { currentMonthIndex = 0 };
      counter++;
    }

    let weekdayNameDivs = [];
    weekdayNames.forEach((day, index) => weekdayNameDivs.push(<div key={index}>{day}</div>));

    let allDates = [];
    for (let date = 1; date <= this.props.days; date ++) {
      allDates.push(<button key={date} name={new Date(2021, 0, 1).toLocaleDateString()} onClick={selectDate}>{date}</button>);
    }

    return (
      <div>
        <div id="display-month">
          {allowedBookingMonths}
        </div>
        <div id="weekday-names">
          {weekdayNameDivs}
        </div>
        <div id="all-dates">
          {allDates}
        </div>
      </div>
    );
  }
}

export default Dates;