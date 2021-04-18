import React from 'react';
import renderer from 'react-test-renderer';
import DisplayCalendar from '../DisplayCalendar/DisplayCalendar';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';

test('test', () => {
  expect(true).toBe(true);
})

test('should render DisplayCalendar component', () => {
  render(<DisplayCalendar />);
  const DisplayCalendarElement = screen.getByTestId('displaycalendar-1');
  expect(DisplayCalendarElement).toBeInTheDocument();
  expect(DisplayCalendarElement).toHaveTextContent('Clear dates');
})
