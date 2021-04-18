import React from 'react';
import './CheckoutTool.css';
import GuestCounter from './GuestCounter/GuestCounter';

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
      guestSelectionClicked,
      toggleGuestSelection,
      handleGuestCounting,
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
    let totalPrice = (
      basePrice +
      cleaningFees +
      serviceFees +
      occupancyFees
    ).toFixed(2);

    return (
      <div id="container">
        <div id="price-and-reviews-container">
          <div
            className="individual-price-reviews-container"
            id="price-container"
          >
            <div id="price">${pricePerNight}</div>
            <div> / night</div>
          </div>
          <div
            className="individual-price-reviews-container"
            id="reviews-container"
          >
            <div id="reviews">
              <i className="fas fa-star"></i>&nbsp;{averageReviews}
            </div>
            <div id="total-reviews">&nbsp;{totalReviews}</div>
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
            <div id="guests-selection-popup" onClick={toggleGuestSelection}>
              <div onClick={toggleGuestSelection}>
                {!guestSelectionClicked ? (
                  <i className="fas fa-angle-down fa-2x"></i>
                ) : (
                  <i className="fas fa-angle-up fa-2x"></i>
                )}
              </div>
            </div>
            <div id="popup-component" hidden={!guestSelectionClicked}>
              <GuestCounter
                selectedAdults={selectedAdults}
                selectedChildren={selectedChildren}
                selectedInfants={selectedInfants}
                handleGuestCounting={handleGuestCounting}
              />
            </div>
          </div>
        </div>
        <button id="checkout-button">
          <div>{checkoutButtonText}</div>
        </button>
        <div id="disclaimer" hidden={!checkOutDate ? true : false}>
          You won't be charged yet
        </div>
        <div id="price-summary-container" hidden={!checkOutDate ? true : false}>
          <div id="price-breakdown-container">
            <div className="fee-containers" id="base-fee-container">
              <div>
                ${pricePerNight} x {duration} nights
              </div>
              <div>${basePrice.toFixed(2)}</div>
            </div>
            <div className="fee-containers" id="cleaning-fee-container">
              <div>Cleaning fee</div>
              <div>${cleaningFees.toFixed(2)}</div>
            </div>
            <div className="fee-containers" id="service-fee-container">
              <div>Service fee</div>
              <div>${serviceFees.toFixed(2)}</div>
            </div>
            <div className="fee-containers" id="occupancy-fee-container">
              <div>Occupancy taxes and fees</div>
              <div>${occupancyFees.toFixed(2)}</div>
            </div>
          </div>
          <div id="total-price-container">
            <div id="total-price">
              <div>Total</div>
              <div>${totalPrice}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CheckoutTool;
