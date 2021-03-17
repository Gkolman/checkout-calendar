import React from 'react';

class CheckoutTool extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pricePerNight: this.props.pricePerNight,
      cleaningFee: this.props.cleaningFee,
      serviceFee: this.props.serviceFee,
      checkInDate: '',
      checkOutDate: '',
      selectedAdults: '',
      selectedChildren: '',
      selectedInfants: ''
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        pricePerNight: this.props.pricePerNight,
        cleaningFee: this.props.cleaningFee,
        serviceFee: this.props.serviceFee,
        checkInDate: this.props.checkInDate,
        checkOutDate: this.props.checkOutDate,
        selectedAdults: this.props.selectedAdults,
        selectedChildren: this.props.selectedChildren,
        selectedInfants: this.props.selectedInfants
      });
    }
  }

  render() {
    const { pricePerNight, cleaningFee, serviceFee, checkInDate, checkOutDate, selectedAdults, selectedChildren, selectedInfants } = this.state;

    const { guestsAllowed, totalReviews, averageReviews } = this.props;

    return (
      <div id="container">
        <div id="price-and-reviews-container">
          <div id="price">
            {pricePerNight} / night
          </div>
          <div id="reviews">
            {averageReviews} - {totalReviews} 
          </div>
        </div>
        <div id="checkout-options-container">
          <div id="checkin-date">
            {checkInDate}
          </div>
          <div id="checkout-date">
            {checkOutDate}
          </div>
          <div id="guests">
            guests selected
          </div>
        </div>
        <div id="price-summary-container">
          <ul>
            <li>price for x nights</li>
            <li>cleaning fee {(pricePerNight * cleaningFee).toPrecision(4)}</li>
            <li>service fee {(pricePerNight * serviceFee).toPrecision(4)}</li>
            <li>occupancy fee</li>
          </ul>
          <div id="price-total">
            total amount: {Number(pricePerNight + (pricePerNight * cleaningFee) + (pricePerNight * serviceFee)).toPrecision(5)}
          </div>
        </div>
      </div>
    );
  }

}

export default CheckoutTool;