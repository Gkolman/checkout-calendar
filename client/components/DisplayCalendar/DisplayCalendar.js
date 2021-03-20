import React from 'react';
import Dates from './Dates/Dates';

class DisplayCalendar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let currentDate = Date();
    let currentDateDayOfWeek = currentDate.split(' ')[0];
    const { currentMonth, currentYear, checkInDate, checkOutDate, selectDate, monthsInAdvance } = this.props;

    let datesInMonth = ((currentMonth <= 6 && currentMonth % 2 === 0) || (currentMonth >= 7 && currentMonth % 2 === 1)) ? 31 : 30;
    if (currentMonth === 1) { datesInMonth = 28; }

    return (
      <div>
        <Dates currentMonth={currentMonth} currentYear={currentYear} days={datesInMonth} monthsInAdvance={monthsInAdvance} dayOfWeek={currentDateDayOfWeek} selectDate={selectDate}/>
      </div>
    );
  }

}

export default DisplayCalendar;

