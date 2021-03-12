import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { numberOfGuests, totalReviewCount, averageReviewRatings } from '../../../sampleData/sampleData';


class CheckoutCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allowedGuests: numberOfGuests.numberOfGuests,
      totalReviews: totalReviewCount,
      averageRating: averageReviewRatings.averageRating,
    };
  }

  componentDidMount() {
    // axios.get('/checkoutInformation/10')
    //   .then(checkoutInfo => {})
  }

  render() {
    const { allowedGuests, totalReviews, averageRating } = this.state;

    return(
      <div>
        <h1> Checkout Calendar Component Filler </h1>
        <h2>Number of guests allowed are: {allowedGuests}</h2>
        <h2>Average Rating: {averageRating} {totalReviews}</h2>
      </div>
    );
  }
}

export default CheckoutCalendar;