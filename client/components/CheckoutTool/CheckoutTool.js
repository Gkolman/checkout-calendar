import React from 'react';
import './CheckoutTool.css';

class CheckoutTool extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      checkInDate,
      checkOutDate,
      pricePerNight,
      averageReviews,
      totalReviews,
      cleaningFee,
      serviceFee,
      occupancyFee,
      checkoutButtonText,
      selectedAdults,
      selectedChildren,
      selectedInfants,
    } = this.props;

    let duration = '';

    let [month, date, year] = checkInDate.split('/');
    let checkInDateTransformed = new Date(year, month, date);

    if (checkOutDate) {
      [month, date, year] = checkOutDate.split('/');
      let checkOutDateTransformed = new Date(year, month, date);
      duration =
        (checkOutDateTransformed - checkInDateTransformed) / 1000 / 86400;
    }

    let basePrice = pricePerNight * duration;
    let cleaningFees = basePrice * cleaningFee;
    let serviceFees = basePrice * serviceFee;
    let occupancyFees = basePrice * occupancyFee;
    let totalPrice = (basePrice + cleaningFees + serviceFees).toFixed(2);

    return (
      <div id="container">
        <div id="price-and-reviews-container">
          <div id="price">{pricePerNight} / night</div>
          <div id="reviews">
            {averageReviews} {totalReviews}
          </div>
        </div>
        <div className="checkout-options" id="checkout-options-container">
          <div id="date-selection-container">
            <div className="selection-individual" id="checkin-date">
              <div className="title">CHECK-IN</div>
              <div
                className={!checkInDate ? 'checkout--placeholder' : 'checkout'}
              >
                {!checkInDate ? 'Add date' : checkInDate}
              </div>
            </div>
            <div className="selection-individual" id="checkout-date">
              <div className="title">CHECKOUT</div>
              <div
                className={!checkOutDate ? 'checkout--placeholder' : 'checkout'}
              >
                {!checkOutDate ? 'Add date' : checkOutDate}
              </div>
            </div>
          </div>
          <div id="guest-selection-container">
            <div className="selection-individual" id="guests-selected">
              <div className="guest title">GUESTS</div>
              <div className="">
                {selectedAdults === 1
                  ? `${selectedAdults} guest`
                  : `${selectedAdults} guests`}
              </div>
            </div>
          </div>
        </div>
        <button id="checkout-button" disabled={true}>
          {checkoutButtonText}
        </button>
        <div id="price-summary-container" hidden={!checkOutDate ? true : false}>
          <ul>
            <li>
              {pricePerNight} for {duration} nights = {basePrice.toFixed(2)}{' '}
            </li>
            <li>cleaning fee = {cleaningFees.toFixed(2)} </li>
            <li>service fee = {serviceFees.toFixed(2)} </li>
            <li>occupancy fee = {occupancyFees.toFixed(2)}</li>
          </ul>
          <div id="price-total">total amount = {totalPrice}</div>
        </div>
      </div>
    );
  }
}

export default CheckoutTool;
