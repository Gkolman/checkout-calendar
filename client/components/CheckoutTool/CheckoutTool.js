import React from 'react';

class CheckoutTool extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pricePerNight: '',
      cleaningFee: '',
      serviceFee: '',
      checkInDate: '',
      checkOutDate: '',
      selectedAdults: '',
      selectedChildren: '',
      selectedInfants: ''
    };
  }

  render() {
    return (
      <div id="container">
        <div id="price-and-reviews-container">
          <div id="price">
            1231231 / night
          </div>
          <div id="reviews">
            average reviews - total reviews
          </div>
        </div>
        <div id="checkout-options-container">
          <div id="checkin-date">
            checkin date
          </div>
          <div id="checkout-date">
            checkout date
          </div>
          <div id="guests">
            guests selected
          </div>
        </div>
        <div id="price-summary-container">
          <ul>
            <li>price for x nights</li>
            <li>cleaning fee</li>
            <li>service fee</li>
            <li>occupancy fee</li>
          </ul>
          <div id="price-total">
            total amount
          </div>
        </div>
      </div>
    );
  }

}

export default CheckoutTool;