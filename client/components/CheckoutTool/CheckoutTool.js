import React from 'react';

class CheckoutTool extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { checkInDate, checkOutDate, pricePerNight, averageReviews, totalReviews, cleaningFee, serviceFee, occupancyFee } = this.props;

    let duration = '';

    let [month, date, year] = checkInDate.split('/');
    let checkInDateTransformed = new Date(year, month, date);

    if (checkOutDate) {
      [month, date, year] = checkOutDate.split('/');
      let checkOutDateTransformed = new Date(year, month, date);
      duration = ((checkOutDateTransformed - checkInDateTransformed) / 1000) / 86400;
    }

    let basePrice = pricePerNight * duration;
    let cleaningFees = basePrice * cleaningFee;
    let serviceFees = basePrice * serviceFee;
    let occupancyFees = basePrice * occupancyFee;
    let totalPrice = (basePrice + cleaningFees + serviceFees).toFixed(2);

    return (
      <div id="container">
        <div id="price-and-reviews-container">
          <div id="price">
            {pricePerNight} / night
          </div>
          <div id="reviews">
            {averageReviews} {totalReviews}
          </div>
        </div>
        <div id="checkout-options-container">
          <div id="checkin-date">
            checkin date in tool: {checkInDate}
          </div>
          <div id="checkout-date">
            checkout date in tool: {checkOutDate}
          </div>
          <div id="guests">
            guests selected
          </div>
        </div>
        <div id="price-summary-container">
          <ul>
            <li>{pricePerNight} for {duration} nights = {basePrice.toFixed(2)} </li>
            <li>cleaning fee = {cleaningFees.toFixed(2)} </li>
            <li>service fee = {serviceFees.toFixed(2)} </li>
            <li>occupancy fee = {occupancyFees.toFixed(2)}</li>
          </ul>
          <div id="price-total">
            total amount = {totalPrice}
          </div>
        </div>
      </div>
    );
  }

}

export default CheckoutTool;