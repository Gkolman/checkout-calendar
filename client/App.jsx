import React from 'react';
import ReactDOM from 'react-dom';

import CheckoutCalendar from './components/CheckoutCalendar/CheckoutCalendar.js';

class App extends React.Component {
  render() {
    return (
      <div>
        <CheckoutCalendar />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));