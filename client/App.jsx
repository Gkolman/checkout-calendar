import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import { DisplayCalendar } from './components/DisplayCalendar/DisplayCalendar';
import CheckoutTool from './components/CheckoutTool/CheckoutTool';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkInDate: '',
      checkOutdate: '',
      pricePerNight: '',
      cleaningFee: '',
      serviceFee: '',
      occupancyFee: '',

    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <DisplayCalendar />
        <CheckoutTool />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));