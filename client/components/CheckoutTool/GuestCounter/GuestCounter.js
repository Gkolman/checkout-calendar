import React from 'react';
import './GuestCounter.css';

class GuestCounter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      selectedInfants,
      selectedChildren,
      selectedAdults,
      handleGuestCounting,
    } = this.props;

    return (
      <div id="popup-container" data-testid="guestcounter-1">
        <div className="individual-containers" id="adult-container">
          <div className="popup-container-individual-title">
            <b>Adults</b>
          </div>
          <div className="counter-wrapper">
            <button>
              <i
                onClick={handleGuestCounting}
                className="fas fa-minus"
                name="minus-Adults"
              ></i>
            </button>
            <div className="counter-containers">{selectedAdults}</div>
            <button>
              <i
                onClick={handleGuestCounting}
                className="fas fa-plus"
                name="plus-Adults"
              ></i>
            </button>
          </div>
        </div>
        <div className="individual-containers" id="children-container">
          <div className="popup-container-individual-title" id="children-title">
            <div>
              <b>Children</b>
            </div>
            <div>Ages 2-12</div>
          </div>
          <div className="counter-wrapper">
            <button>
              <i
                onClick={handleGuestCounting}
                className="fas fa-minus"
                name="minus-Children"
              ></i>
            </button>
            <div className="counter-containers">{selectedChildren}</div>
            <button>
              <i
                onClick={handleGuestCounting}
                className="fas fa-plus"
                name="plus-Children"
              ></i>
            </button>
          </div>
        </div>
        <div className="individual-containers" id="infants-container">
          <div className="popup-container-individual-title">
            <div>
              <b>Infants</b>
            </div>
            <div>Under 2</div>
          </div>
          <div className="counter-wrapper">
            <button>
              <i
                onClick={handleGuestCounting}
                className="fas fa-minus"
                name="minus-Infants"
              ></i>
            </button>
            <div className="counter-containers">{selectedInfants}</div>
            <button>
              <i
                onClick={handleGuestCounting}
                className="fas fa-plus"
                name="plus-Infants"
              ></i>
            </button>
          </div>
        </div>
        <div className="individual-containers" id="max-guest-container">
          <div>
            4 guests maximum. Infants don’t count toward the number of guests.
          </div>
        </div>
      </div>
    );
  }
}

export default GuestCounter;
