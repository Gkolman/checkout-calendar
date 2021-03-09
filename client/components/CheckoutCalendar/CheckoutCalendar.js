import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class CheckoutCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // axios.get('/checkoutInformation/10')
    //   .then(checkoutInfo => {})
  }

  render() {
    return(
      <div>
        <h1> Checkout Calendar Component Filler </h1>
      </div>
    );
  }
}

export default CheckoutCalendar;