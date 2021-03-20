import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import DisplayCalendar from './components/DisplayCalendar/DisplayCalendar';
import CheckoutTool from './components/CheckoutTool/CheckoutTool';

import { numberOfGuests, totalReviewCount, averageReviewRatings } from '../sampleData/sampleData';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkInDate: '',
      checkOutDate: '',
      monthsInAdvance: '',
      pricePerNight: '',
      cleaningFee: '',
      serviceFee: '',
      occupancyFee: 0.1,
      selectedAdults: 1,
      selectedChildren: 0,
      selectedInfants: 0

    };

    this.selectDate = this.selectDate.bind(this);
  }

  componentDidMount() {
    let productId = window.location.pathname.split('/')[1];

    axios.get(`/checkoutInformation/${productId}`)
      .then(response => {
        this.setState({
          monthsInAdvance: response.data.monthsInAdvance,
          pricePerNight: response.data.priceForDate,
          serviceFee: response.data.serviceFee,
          cleaningFee: response.data.cleaningFee,
        });
      });
  }

  selectDate(e) {
    if (!this.state.checkInDate) {
      this.setState({ checkInDate: e.target.name});
    } else if (this.state.checkInDate && this.state.checkOutDate) {
      this.setState({
        checkInDate: e.target.name,
        checkOutDate: ''
      });
    } else {

      this.setState({ checkOutDate: e.target.name});
    }
  }

  render() {
    const { checkInDate, checkOutDate, monthsInAdvance, pricePerNight, cleaningFee, serviceFee, occupancyFee, selectedAdults, selectedChildren, selectedInfants } = this.state;
    let [month, date, year] = new Date().toLocaleDateString('en-US').split('/');

    return (
      <div>
        <DisplayCalendar currentMonth={month} currentYear={year} checkInDate={checkInDate} checkOutDate={checkOutDate} monthsInAdvance={monthsInAdvance} selectDate={this.selectDate}/>
        <CheckoutTool currentMonth={month} currentYear={year} checkInDate={checkInDate} checkOutDate={checkOutDate} guestsAllowed={numberOfGuests.numberOfGuests} totalReviews={totalReviewCount} averageReviews={averageReviewRatings.averageRating} pricePerNight={pricePerNight} serviceFee={serviceFee} cleaningFee={cleaningFee} occupancyFee={occupancyFee} selectedAdults={selectedAdults} selectedChildren={selectedChildren} selectedInfants={selectedInfants} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('checkoutCalendar'));