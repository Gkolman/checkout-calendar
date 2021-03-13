import React from 'react';
import renderer from 'react-test-renderer';



import CheckoutCalendar from './CheckoutCalendar';

test('should render the correct component', () => {
  const checkoutComponentTest = JSON.parse(JSON.stringify(renderer.create(
    <CheckoutCalendar />
  )));

  // console.log(checkoutComponentTest)

  expect(checkoutComponentTest.type).toBe('div');
  expect(checkoutComponentTest.children.length).toBeTruthy;
});