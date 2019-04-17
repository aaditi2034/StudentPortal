/* eslint-disable no-undef */
import React from 'react';
import {
  render,
  cleanup,
} from 'react-testing-library';
import 'jest-dom/extend-expect';
import TestInputField from '../../formFields/InputField';

afterEach(cleanup);

describe('render Test Input Field', () => {
  it('render correctly BaseFieldLayout component', () => {
    const BaseFieldLayoutComponent = render(<TestInputField />);
    expect(BaseFieldLayoutComponent).toMatchSnapshot();
  });
});
