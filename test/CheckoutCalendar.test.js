import React from 'react';
import renderer from 'react-test-renderer';

import CheckoutCalendar from '../client/components/CheckoutCalendar/CheckoutCalendar';

describe('Renders CheckoutCalendar component correctly', () => {

  test('should render the correct component', () => {
    const checkoutComponentTest = JSON.parse(JSON.stringify(renderer.create(
      <CheckoutCalendar />
    )));

    console.log(checkoutComponentTest.children[1].children)

    expect(checkoutComponentTest.type).toBe('div');
    expect(checkoutComponentTest.children.length).toBeTruthy;
  });
});