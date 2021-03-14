import React from 'react';
import ReactDOM from 'react-dom';

import { DisplayCalendar } from './components/DisplayCalendar/DisplayCalendar';
import CheckoutTool from './components/CheckoutTool/CheckoutTool';

class App extends React.Component {
  render() {
    return (
      <div>
        <DisplayCalendar />
        <CheckoutTool />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));