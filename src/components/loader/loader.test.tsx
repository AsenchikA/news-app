import { render, screen } from '@testing-library/react';
import React from 'react';
import { Loader } from './index';

test('Loader should be rendered', () => {
  render(<Loader />);

  expect(screen.getByTestId('loader')).toBeInTheDocument();
});

test('Loader should render passed className', () => {
  const className = 'testClass';
  render(<Loader className="testClass" />);

  expect(screen.getByTestId('loader')).toHaveClass(className);
});
