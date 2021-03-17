import React from 'react';
import { weekdayNames } from './weekdayNames';

class Dates extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let weekdayNameDivs = [];
    weekdayNames.forEach((day, index) => weekdayNameDivs.push(<div key={index}>{day}</div>));
    
    let allDates = [];
    for (let date = 1; date <=this.props.days; date ++) {
      allDates.push(<div key={date}>{date}</div>);
    }
    return (
      <div>
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