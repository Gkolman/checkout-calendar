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

  // componentDidUpdate(prevProps) {
  //   if (prevProps !== this.props) {
  //     this.setState({
  //       pricePerNight: this.props.pricePerNight,
  //       cleaningFee: this.props.cleaningFee,
  //       serviceFee: this.props.serviceFee,
  //       checkInDate: this.props.checkInDate,
  //       checkOutDate: this.props.checkOutDate,
  //       selectedAdults: this.props.selectedAdults,
  //       selectedChildren: this.props.selectedChildren,
  //       selectedInfants: this.props.selectedInfants
  //     });
  //   }
  // }

  render() {
    const { checkInDate, checkOutDate, pricePerNight, averageReviews, totalReviews, cleaningFee, serviceFee } = this.props;
    
    let duration = !checkOutDate ? '' : checkOutDate - checkInDate;
    let basePrice = pricePerNight * duration;
    let cleaningFees = basePrice * cleaningFee;
    let serviceFees = basePrice * serviceFee;
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
            <li>{pricePerNight} for {duration} nights = {basePrice} </li>
            <li>cleaning fee = {cleaningFees.toFixed(2)} </li>
            <li>service fee = {serviceFees.toFixed(2)} </li>
            <li>occupancy fee</li>
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