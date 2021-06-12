import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './App.css';

import DisplayCalendar from './components/DisplayCalendar/DisplayCalendar';
import CheckoutTool from './components/CheckoutTool/CheckoutTool';

import {
  numberOfGuests,
  totalReviewCount,
  averageReviewRatings,
} from '../sampleData.js';

import { months } from './calendarMonths.js';

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
      selectedInfants: 0,
      calendarMessage: 'Select check-in date',
      calendarSubMessage: 'Add your travel dates for exact pricing',
      sliderPosition: 0,
      direction: null,
      checkoutButtonText: 'Check availability',
      guestSelectionClicked: false,
    };

    this.selectDate = this.selectDate.bind(this);
    this.clearDates = this.clearDates.bind(this);
    this.changeSlider = this.changeSlider.bind(this);
    this.toggleGuestSelection = this.toggleGuestSelection.bind(this);
    this.handleGuestCounting = this.handleGuestCounting.bind(this);
  }

  componentDidMount() {
    let productId = parseInt(window.location.pathname.split('locations/')[1]).toString()
    if (productId === 'NaN') return
      console.log('typeof(productId)', typeof(productId))
      console.log('productId', productId)
      axios.get(`/checkoutInformation/${productId}`)
      .then((response) => {
        console.log('response -> ', response)
        this.setState({
          monthsInAdvance: response.data.monthsInAdvance,
          pricePerNight: response.data.priceForDate,
          serviceFee: response.data.serviceFee,
          cleaningFee: response.data.cleaningFee,
        });
        console.log('this state -> ', this.state)
      })
      .catch((error) => {
        console.log('error -> ', error)
      });

  }

  selectDate(e) {
    if (!this.state.checkInDate) {
      this.setState({
        checkInDate: e.target.name,
        calendarMessage: 'Select checkout date',
        calendarSubMessage: 'Minimum stay: 1 night',
      });
    } else if (this.state.checkInDate && this.state.checkOutDate) {
      this.setState({
        checkInDate: e.target.name,
        checkOutDate: '',
        calendarMessage: 'Select checkout date',
        calendarSubMessage: 'Minimum stay: 1 night',
      });
    } else if (this.state.checkInDate === e.target.name) {
      this.setState({
        checkInDate: '',
        calendarMessage: 'Select checkout date',
        calendarSubMessage: 'Minimum stay: 1 night',
      });
    } else {
      let [month, date, year] = this.state.checkInDate.split('/');
      let checkInDateTransformed = new Date(
        Number(year),
        Number(month) - 1,
        Number(date)
      );
      let [month2, date2, year2] = e.target.name.split('/');
      let checkOutDateTransformed = new Date(
        Number(year2),
        Number(month2) - 1,
        Number(date2)
      );

      const formatForCalendarMessage = (dateString) => {
        let dateSplit = dateString.toLocaleDateString().split('/');

        return `${months[Number(dateSplit[0]) - 1].slice(0, 3)} ${
          dateSplit[1]
        }, ${dateSplit[2]}`;
      };

      let formattedCheckIn = formatForCalendarMessage(checkInDateTransformed);
      let formattedCheckOut = formatForCalendarMessage(checkOutDateTransformed);

      if (checkOutDateTransformed - checkInDateTransformed < 0) {
        this.setState({ checkOutDate: '' });
      } else {
        this.setState({
          checkOutDate: e.target.name,
          calendarMessage: `${(
            (checkOutDateTransformed - checkInDateTransformed) /
            1000 /
            86400
          ).toFixed(0)} nights in {location}`,
          calendarSubMessage: `${formattedCheckIn} - ${formattedCheckOut}`,
          checkoutButtonText: 'Reserve',
        });
      }
    }
  }

  clearDates() {
    this.setState({
      checkInDate: '',
      checkOutDate: '',
      calendarMessage: 'Select check-in date',
      calendarSubMessage: 'Add your travel dates for exact pricing',
      checkoutButtonText: 'Check availability',
    });
  }

  changeSlider(e) {
    if (e.target.getAttribute('name') === 'left') {
      this.setState({ direction: 'left' });
      if (this.state.sliderPosition > 0) {
        this.setState({ sliderPosition: --this.state.sliderPosition });
      }
    } else {
      this.setState({
        sliderPosition: ++this.state.sliderPosition,
        direction: 'right',
      });
    }
  }

  toggleGuestSelection() {
    this.setState({ guestSelectionClicked: !this.state.guestSelectionClicked });
  }

  handleGuestCounting(e) {
    let plusOrMinus = e.target.getAttribute('name').split('-');
    if (plusOrMinus[0] === 'minus') {
      if (this.state[`selected${plusOrMinus[1]}`] > 0) {
        if (plusOrMinus[1] !== 'Adults') {
          this.setState({
            ['selected' + plusOrMinus[1]]: --this.state[
              'selected' + plusOrMinus[1]
            ],
          });
        } else {
          if (this.state.selectedAdults > 1) {
            this.setState({ selectedAdults: --this.state.selectedAdults });
          }
        }
      }
    } else {
      this.setState({
        ['selected' + plusOrMinus[1]]: ++this.state[
          'selected' + plusOrMinus[1]
        ],
      });
    }
  }

  render() {
    const {
      checkInDate,
      checkOutDate,
      monthsInAdvance,
      pricePerNight,
      cleaningFee,
      serviceFee,
      occupancyFee,
      selectedAdults,
      selectedChildren,
      selectedInfants,
      calendarMessage,
      calendarSubMessage,
      sliderPosition,
      direction,
      checkoutButtonText,
      guestSelectionClicked,
    } = this.state;
    console.log('this.state->,', this.state)
    let [month, date, year] = new Date().toLocaleDateString('en-US').split('/');

    return (
      <div id="wrapper">
        <div id="main-checkout-container">
          <div>
            <DisplayCalendar
              currentDate={date}
              currentMonth={month}
              currentYear={year}
              checkInDate={checkInDate}
              checkOutDate={checkOutDate}
              monthsInAdvance={monthsInAdvance}
              calendarMessage={calendarMessage}
              calendarSubMessage={calendarSubMessage}
              sliderPosition={sliderPosition}
              direction={direction}
              selectDate={this.selectDate}
              clearDates={this.clearDates}
              changeSlider={this.changeSlider}
            />
          </div>
          <CheckoutTool
            currentMonth={month}
            currentYear={year}
            checkInDate={checkInDate}
            checkOutDate={checkOutDate}
            totalReviews={totalReviewCount}
            pricePerNight={pricePerNight}
            serviceFee={serviceFee}
            cleaningFee={cleaningFee}
            occupancyFee={occupancyFee}
            selectedAdults={selectedAdults}
            selectedChildren={selectedChildren}
            selectedInfants={selectedInfants}
            checkoutButtonText={checkoutButtonText}
            guestSelectionClicked={guestSelectionClicked}
            guestsAllowed={numberOfGuests.numberOfGuests}
            averageReviews={averageReviewRatings.averageRating}
            toggleGuestSelection={this.toggleGuestSelection}
            handleGuestCounting={this.handleGuestCounting}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('checkoutCalendar'));
