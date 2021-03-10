import React from 'react';
import ReactDOM from 'react-dom';

import CheckoutCalendar from './components/CheckoutCalendar/CheckoutCalendar.js';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>testing in appjsx</h1>
        <CheckoutCalendar />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));