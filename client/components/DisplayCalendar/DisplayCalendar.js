import React from 'react';
import { Dates } from './Dates/Dates';
import { months } from './calendarMonths';

class DisplayCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monthsInAdvance: this.props.monthsInAdvance,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        monthsInAdvance: this.props.monthsInAdvance
      });
    }
  }

  render() {
    let [month, date, year] = new Date().toLocaleDateString('en-US').split('/');
    const { monthsInAdvance } = this.state;

    return (
      <div>
        months in advance : {monthsInAdvance}
        <br />
        current month: {months[month]};
      </div>
    );
  }

}

export default DisplayCalendar;

