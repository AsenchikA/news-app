import { render, screen } from '@testing-library/react';
import React from 'react';
import { Select } from './index';

test('Select should be rendered', () => {
  render(<Select optionList={[]} />);

  expect(screen.getByRole('combobox')).toBeInTheDocument();
});

test('Select should render passed className for container', () => {
  const className = 'class';
  render(<Select className={className} optionList={[]} />);

  expect(screen.getByRole('combobox')).toHaveClass(className);
});

test('Select should render passed list of options', () => {
  const optionCaption = '1';
  render(<Select optionList={[{ value: 1, caption: optionCaption }]} />);

  expect(screen.getByRole('combobox')).toHaveTextContent(optionCaption);
});

test('Select should render empty option by default', () => {
  render(<Select optionList={[]} />);

  expect(screen.getByTestId('default-option')).toBeInTheDocument();
});
