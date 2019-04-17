/* eslint-disable no-undef */
import React from 'react';
import {
  render,
  cleanup,
} from 'react-testing-library';
import 'jest-dom/extend-expect';
import Header from './Header';

afterEach(cleanup);

it('renders', () => {
  const { asFragment } = render(<Header text="Student Portal" />);
  expect(asFragment()).toMatchSnapshot();
});

it('inserts text in h1', () => {
  const { getByText } = render(<Header text="Student Portal" />);
  expect(getByText('Student Portal')).toHaveClass('fancy-h1');
});
