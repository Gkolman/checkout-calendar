import React from 'react';
import renderer from 'react-test-renderer';
import GuestCounter from '../CheckoutTool/GuestCounter/GuestCounter';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';


afterEach(() => {
  cleanup();
});

test('test', () => {
  expect(true).toBe(true);
})

test('should render GuestCounter component', () => {
  render(<GuestCounter />);
  const GuestCounterElement = screen.getByTestId('guestcounter-1');
  expect(GuestCounterElement).toBeInTheDocument();
  expect(GuestCounterElement).toHaveTextContent('AdultsChildrenAges 2-12InfantsUnder 24 guests maximum. Infants don’t count toward the number of guests.');
})
