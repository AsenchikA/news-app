import { Select } from '@components/select';
import React, { FC, useCallback, useState, ChangeEvent, useMemo } from 'react';

enum EDateSelectOption {
  ANY_TIME,
  PAST_HOUR,
  PAST_DAY,
  PAST_WEEK,
  PAST_YEAR,
}

interface IProps {
  onChange: (from: string, to: string) => void;
  className?: string;
}

export const DateSelect: FC<IProps> = ({ className, onChange }) => {
  const [value, setValue] = useState(EDateSelectOption.ANY_TIME);

  const optionList = useMemo(
    () => [
      { value: EDateSelectOption.ANY_TIME, caption: 'Any time' },
      { value: EDateSelectOption.PAST_HOUR, caption: 'Past hour' },
      { value: EDateSelectOption.PAST_DAY, caption: 'Past day' },
      { value: EDateSelectOption.PAST_WEEK, caption: 'Past week' },
      { value: EDateSelectOption.PAST_YEAR, caption: 'Past year' },
    ],
    []
  );

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

          onChange(fromDateTime.toISOString(), currentDateTime.toISOString());
          break;
        }
        case EDateSelectOption.PAST_DAY: {
          const fromDateTime = new Date(currentDateTime);
          fromDateTime.setDate(fromDateTime.getDate() - 1);

          onChange(fromDateTime.toISOString(), currentDateTime.toISOString());
          break;
        }
        case EDateSelectOption.PAST_WEEK: {
          const fromDateTime = new Date(currentDateTime);
          fromDateTime.setDate(fromDateTime.getDate() - 7);

          onChange(fromDateTime.toISOString(), currentDateTime.toISOString());
          break;
        }
        case EDateSelectOption.PAST_YEAR: {
          const fromDateTime = new Date(currentDateTime);
          fromDateTime.setFullYear(fromDateTime.getFullYear() - 1);

          onChange(fromDateTime.toISOString(), currentDateTime.toISOString());
          break;
        }
        default:
          break;
      }
    },
    [onChange]
  );

  return <Select containerClassName={className} value={value} optionList={optionList} onChange={onSelectChange} />;
};
