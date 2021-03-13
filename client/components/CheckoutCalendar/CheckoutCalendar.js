import React from 'react';
import axios from 'axios';
import { numberOfGuests, totalReviewCount, averageReviewRatings } from '../../../sampleData/sampleData';


class CheckoutCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalReviews: totalReviewCount,
      averageRating: averageReviewRatings.averageRating,
      pricePerNight: '',
    };
  }

  componentDidMount() {
    let productId = window.location.pathname.split('/')[1];
    axios.get(`/checkoutInformation/${productId}`)
      .then(checkoutInfo => {
        this.setState({ pricePerNight: checkoutInfo.data.priceForDate });
      });
  }

  render() {
    const { totalReviews, averageRating, pricePerNight } = this.state;
    const allowedGuests = numberOfGuests.numberOfGuests;

    return (
      <div>
        <h1>Checkout Calendar Component Filler</h1>
        <h2>{pricePerNight} /night</h2>
        <h2>Number of guests allowed are: {allowedGuests}</h2>
        <h2>Average Rating: {averageRating} {totalReviews}</h2>
      </div>
    );
  }
}

export default CheckoutCalendar;