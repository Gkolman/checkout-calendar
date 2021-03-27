import React from 'react';
import Dates from './Dates/Dates';
import './DisplayCalendar.css';

class DisplayCalendar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let todaysDate = Date();
    let currentDateDayOfWeek = todaysDate.split(' ')[0];
    const {
      currentDate,
      currentMonth,
      currentYear,
      checkInDate,
      checkOutDate,
      selectDate,
      changeSlider,
      clearDates,
      monthsInAdvance,
      calendarMessage,
      calendarSubMessage,
      sliderPosition,
      direction
    } = this.props;

    return (
      <div className="display-calendar-component">
        <div>{calendarMessage}</div>
        <div>{calendarSubMessage}</div>
        <Dates
          currentDate={currentDate}
          currentMonth={currentMonth}
          currentYear={currentYear}
          monthsInAdvance={monthsInAdvance}
          dayOfWeek={currentDateDayOfWeek}
          selectDate={selectDate}
          changeSlider={changeSlider}
          sliderPosition={sliderPosition}
          direction={direction}
        />
        <div className="bottom-bar">
          <button>keyboard input button</button>
          <button id="clear-dates-button" onClick={clearDates}>
            clear dates
          </button>
        </div>
      </div>
    );
  }
}

export default DisplayCalendar;
