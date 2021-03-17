import React from 'react';
import { weekdayNames } from './weekdayNames';

class Dates extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let weekdayNameDivs = [];
    weekdayNames.forEach(day => weekdayNameDivs.push(<div>{day}</div>));
    return (
      <div>
        <div id="weekday-names">
          {weekdayNameDivs}
        </div>
      </div>
    );
  }
}

export default Dates;