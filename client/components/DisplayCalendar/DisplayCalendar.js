import React from 'react';
import Dates from './Dates/Dates';

class DisplayCalendar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let currentDate = Date();
    let currentDateDayOfWeek = currentDate.split(' ')[0];
    const { currentMonth, checkInDate, checkOutDate, selectDate } = this.props;

    let datesInMonth = ((currentMonth <= 6 && currentMonth % 2 === 0) || (currentMonth >= 7 && currentMonth % 2 === 1)) ? 31 : 30;
    if (currentMonth === 1) { datesInMonth = 28; }

    let fullCheckInDate = !checkInDate ? '' : new Date(year, month, checkInDate).toLocaleDateString('en-US');
    let fullCheckOutDate = !checkOutDate ? '' : new Date(year, month, checkOutDate).toLocaleDateString('en-US');
    return (
      <div>
        selected check in date: {fullCheckInDate}
        <br />
        selected check out date: {fullCheckOutDate}
        <br />
        <Dates days={datesInMonth} dayOfWeek={currentDateDayOfWeek} selectDate={selectDate}/>
        <br />
      </div>
    );
  }

}

export default DisplayCalendar;

