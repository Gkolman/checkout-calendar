import React from 'react';
import Dates from './Dates/Dates';
import { months } from './calendarMonths';

class DisplayCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monthsInAdvance: this.props.monthsInAdvance,
    };
  }

  componentDidUpdate(prevProps) {
    console.log('this props: ', this.props);
    if (prevProps !== this.props) {
      this.setState({
        monthsInAdvance: this.props.monthsInAdvance
      });
    }
  }

  render() {
    let currentDate = Date();
    let currentDateDayOfWeek = currentDate.split(' ')[0];
    let [month, date, year] = new Date().toLocaleDateString('en-US').split('/');
    const { monthsInAdvance } = this.state;
    const { checkInDate, checkOutDate, selectDate } = this.props;

    let datesInMonth = ((month <= 6 && month % 2 === 0) || (month >= 7 && month % 2 === 1)) ? 31 : 30;
    if (month === 1) { datesInMonth = 28; }

    return (
      <div>
        months in advance : {monthsInAdvance}
        <br />
        current date: {currentDateDayOfWeek}
        <br /> 
        {months[month]} {year}
        <br />
        selected check in date: {checkInDate}
        <br />
        selected check out date: {checkOutDate}
        <br />
        <Dates days={datesInMonth} dayOfWeek={currentDateDayOfWeek} selectDate={selectDate}/>
        <br />
        dates in month of {months[month]} is {datesInMonth}
        <br />
      </div>
    );
  }

}

export default DisplayCalendar;

