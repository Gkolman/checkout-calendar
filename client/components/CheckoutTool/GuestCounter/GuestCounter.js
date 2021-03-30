import React from 'react';
import './GuestCounter.css';

class GuestCounter extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {

    const { selectedInfants, selectedChildren, selectedAdults, handleGuestCounting } = this.props;

    return (
      <div id="popup-container">
        <div className="individual-containers" id="adult-container">
          <div className="popup-container-individual-title">Adults</div>
          <button><i onClick={handleGuestCounting} className="fas fa-minus" name="minus-Adults"></i></button>
          <div className="counter-containers">{selectedAdults}</div>
          <button><i onClick={handleGuestCounting} className="fas fa-plus" name="plus-Adults"></i></button>
        </div>
        <div className="individual-containers" id="children-container">
          <div className="popup-container-individual-title">Children</div>
          <button><i onClick={handleGuestCounting} className="fas fa-minus" name="minus-Children"></i></button>
          <div className="counter-containers">{selectedChildren}</div>
          <button><i onClick={handleGuestCounting} className="fas fa-plus" name="plus-Children"></i></button>
        </div>
        <div className="individual-containers" id="infants-container">
          <div className="popup-container-individual-title">Infants</div>
          <button><i onClick={handleGuestCounting} className="fas fa-minus" name="minus-Infants"></i></button>
          <div className="counter-containers">{selectedInfants}</div>
          <button><i onClick={handleGuestCounting} className="fas fa-plus" name="plus-Infants"></i></button>
        </div>
      </div>
    )
  }
}

export default GuestCounter;