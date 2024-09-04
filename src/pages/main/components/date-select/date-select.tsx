import { Select } from '@components/select';
import React, { FC, useCallback, useState, ChangeEvent } from 'react';
import { DATE_SELECT_OPTIONS } from './constants';
import { EDateSelectOption } from './enums';

interface IProps {
  onChange: (from: string, to: string) => void;
  className?: string;
}

export const DateSelect: FC<IProps> = ({ className, onChange }) => {
  const [value, setValue] = useState(EDateSelectOption.ANY_TIME);

  const onSelectChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const newValue = Number(event.target.value);

      setValue(newValue);

      const currentDateTime = new Date();

      switch (newValue) {
        case EDateSelectOption.ANY_TIME:
          onChange('', '');
          break;
        case EDateSelectOption.PAST_HOUR: {
          const fromDateTime = new Date(currentDateTime);
          fromDateTime.setHours(fromDateTime.getHours() - 1);

          onChange(fromDateTime.toISOString().split('.')[0], currentDateTime.toISOString().split('.')[0]);
          break;
        }
        case EDateSelectOption.PAST_DAY: {
          const fromDateTime = new Date(currentDateTime);
          fromDateTime.setDate(fromDateTime.getDate() - 1);

          onChange(fromDateTime.toISOString().split('.')[0], currentDateTime.toISOString().split('.')[0]);
          break;
        }
        case EDateSelectOption.PAST_WEEK: {
          const fromDateTime = new Date(currentDateTime);
          fromDateTime.setDate(fromDateTime.getDate() - 7);

          onChange(fromDateTime.toISOString().split('.')[0], currentDateTime.toISOString().split('.')[0]);
          break;
        }
        case EDateSelectOption.PAST_YEAR: {
          const fromDateTime = new Date(currentDateTime);
          fromDateTime.setFullYear(fromDateTime.getFullYear() - 1);

          onChange(fromDateTime.toISOString().split('.')[0], currentDateTime.toISOString().split('.')[0]);
          break;
        }
        default:
          break;
      }
    },
    [onChange]
  );

  return (
    <Select
      data-testid="date-select"
      containerClassName={className}
      value={value}
      optionList={DATE_SELECT_OPTIONS}
      onChange={onSelectChange}
    />
  );
};
