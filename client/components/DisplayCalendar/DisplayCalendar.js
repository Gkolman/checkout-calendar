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
      direction,
    } = this.props;

    return (
      <div className="display-calendar-component">
        <div id="calendarMessage">{calendarMessage}</div>
        <div id="calendarSubMessage">{calendarSubMessage}</div>
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
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
        />
        <div className="bottom-bar">
          <button id="keyboard-input">
            <svg id="keyboard-input-svg">
              <path d="M29 5a2 2 0 0 1 1.995 1.85L31 7v18a2 2 0 0 1-1.85 1.995L29 27H3a2 2 0 0 1-1.995-1.85L1 25V7a2 2 0 0 1 1.85-1.995L3 5zm0 2H3v18h26zm-8 13v2H11v-2zm3-5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm16-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
            </svg>
          </button>
          <button id="clear-dates-button" onClick={clearDates}>
            <u>Clear dates</u>
          </button>
        </div>
      </div>
    );
  }
}

export default DisplayCalendar;
