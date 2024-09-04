import { EDateSelectOption } from './enums';

export const DATE_SELECT_OPTIONS = [
  { value: EDateSelectOption.ANY_TIME, caption: 'Any time' },
  { value: EDateSelectOption.PAST_HOUR, caption: 'Past hour' },
  { value: EDateSelectOption.PAST_DAY, caption: 'Past day' },
  { value: EDateSelectOption.PAST_WEEK, caption: 'Past week' },
  { value: EDateSelectOption.PAST_YEAR, caption: 'Past year' },
];
