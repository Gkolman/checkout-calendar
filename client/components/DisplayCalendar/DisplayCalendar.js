import React from 'react';
import Dates from './Dates/Dates';

class DisplayCalendar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let todaysDate = Date();
    let currentDateDayOfWeek = todaysDate.split(' ')[0];
    const { currentDate, currentMonth, currentYear, checkInDate, checkOutDate, selectDate, monthsInAdvance, calendarMessage, calendarSubMessage } = this.props;

    return (
      <div>
        <div>{calendarMessage}</div>
        <div>{calendarSubMessage}</div>
        <Dates currentDate={currentDate} currentMonth={currentMonth} currentYear={currentYear} monthsInAdvance={monthsInAdvance} dayOfWeek={currentDateDayOfWeek} selectDate={selectDate}/>
      </div>
    );
  }
}

export default DisplayCalendar;

