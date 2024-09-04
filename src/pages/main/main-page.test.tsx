import React from 'react';
import { setupServer } from 'msw/node';
import { renderWithProviders } from '@utils/test-utils';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { handlers } from '@mocks/handlers';
import { errorHandlers } from '@mocks/error-handlers';
import { MainPage } from '.';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => {
  jest.useRealTimers();
  server.resetHandlers();
});
afterAll(() => server.close());

test('Main page should render loader while articles are being loading for the first time', () => {
  renderWithProviders(<MainPage />);

  expect(screen.getByTestId('loader')).toBeInTheDocument();
  expect(screen.queryByText(/test 1/i)).not.toBeInTheDocument();
});

test('Main page should render top articles by default', async () => {
  renderWithProviders(<MainPage />);

  expect(await screen.findByText(/test 1/i)).toBeInTheDocument();
});

test('Main page should rerender articles after changing request', async () => {
  const user = userEvent.setup();

  renderWithProviders(<MainPage />);

  await screen.findByText(/test 1/i);

  await user.type(screen.getByRole('textbox'), 'test 2');
  await user.keyboard('{enter}');

  expect(screen.getByTestId('loader')).toBeInTheDocument();

  await screen.findByText(/test 2/i);

  expect(await screen.queryByTestId('loader')).not.toBeInTheDocument();
  expect(screen.queryByText(/test 1/i)).not.toBeInTheDocument();
});

test('Main page should render caption for the search without results', async () => {
  const user = userEvent.setup();

  renderWithProviders(<MainPage />);

  await user.type(screen.getByRole('textbox'), 'unsupported request');
  await user.keyboard('{enter}');

  expect(await screen.findByText(/no results/i)).toBeInTheDocument();
});

test('Main page should filter articles by date', async () => {
  jest.useFakeTimers({ advanceTimers: true });
  jest.setSystemTime(new Date('2020-01-01T12:00:00Z'));

  const user = userEvent.setup();

  renderWithProviders(<MainPage />);

  await screen.findByText(/test 1/i);

  await user.selectOptions(screen.getByTestId('date-select'), 'Past day');
  await user.click(screen.getByRole('button'));

  expect(screen.getByTestId('loader')).toBeInTheDocument();

  await screen.findAllByText(/January 1, 2020/i);

  expect(screen.queryByText(/January 2, 2020/i)).not.toBeInTheDocument();
});

test('Main page should filter articles by source', async () => {
  const user = userEvent.setup();

  renderWithProviders(<MainPage />);

  await screen.findByText(/test 1/i);

  await user.selectOptions(screen.getByTestId('source-select'), 'source 2');
  await user.click(screen.getByRole('button'));

  await screen.getByTestId('loader');

  await screen.findAllByText(/Author from source 2/i);

  expect(screen.queryByText(/Author from source 1/i)).not.toBeInTheDocument();
});

test('Main page should render caption for the search if something went wrong', async () => {
  server.use(...errorHandlers);

  renderWithProviders(<MainPage />);

  expect(await screen.findByText(/error/i)).toBeInTheDocument();
});
