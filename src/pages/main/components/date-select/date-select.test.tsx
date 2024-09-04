import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EDateSelectOption } from './enums';
import { DateSelect } from '.';
import { DATE_SELECT_OPTIONS } from './constants';

const currentDateTime = '2020-01-01T00:00:00';

beforeAll(() => {
  jest.useFakeTimers({ advanceTimers: true });
  jest.setSystemTime(new Date('2020-01-01T00:00:00Z'));
});

afterAll(() => {
  jest.useRealTimers();
});

const datesByValue = {
  [EDateSelectOption.ANY_TIME]: {
    from: '',
    to: '',
  },
  [EDateSelectOption.PAST_HOUR]: {
    from: '2019-12-31T23:00:00',
    to: currentDateTime,
  },
  [EDateSelectOption.PAST_DAY]: {
    from: '2019-12-31T00:00:00',
    to: currentDateTime,
  },
  [EDateSelectOption.PAST_WEEK]: {
    from: '2019-12-25T00:00:00',
    to: currentDateTime,
  },
  [EDateSelectOption.PAST_YEAR]: {
    from: '2019-01-01T00:00:00',
    to: currentDateTime,
  },
};

describe.each(DATE_SELECT_OPTIONS)('DateSelect', ({ value, caption }) => {
  test(`choose right dates for '${caption}' option`, async () => {
    const user = userEvent.setup();
    const onChange = jest.fn();
    render(<DateSelect onChange={onChange} />);

    await user.selectOptions(screen.getByRole('combobox'), caption);
    const dates = datesByValue[value];
    expect(onChange).toHaveBeenCalledWith(dates.from, dates.to);
  });
});
