import { render, screen } from '@testing-library/react';
import React from 'react';
import { Button } from './index';

test('Button should be rendered', () => {
  render(<Button text="text" />);

  expect(screen.getByRole('button')).toBeInTheDocument();
});

test('Button should render correct text', () => {
  const text = 'Text in button';
  render(<Button text={text} />);

  expect(screen.getByRole('button')).toHaveTextContent(text);
});
