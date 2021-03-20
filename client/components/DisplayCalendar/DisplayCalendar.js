import React from 'react';
import Dates from './Dates/Dates';

class DisplayCalendar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let todaysDate = Date();
    let currentDateDayOfWeek = todaysDate.split(' ')[0];
    const { currentDate, currentMonth, currentYear, checkInDate, checkOutDate, selectDate, monthsInAdvance } = this.props;

    console.log('current month in display calendar: ', currentMonth)
    let datesInMonth = ((currentMonth <= 6 && currentMonth % 2 === 0) || (currentMonth >= 7 && currentMonth % 2 === 1)) ? 31 : 30;
    if (currentMonth === 1) { datesInMonth = 28; }

    return (
      <div>
        <Dates currentDate={currentDate}currentMonth={currentMonth} currentYear={currentYear} days={datesInMonth} monthsInAdvance={monthsInAdvance} dayOfWeek={currentDateDayOfWeek} selectDate={selectDate}/>
      </div>
    );
  }

}

export default DisplayCalendar;

