import { Button } from '@components/button';
import { DateInput } from '@components/date-input';
import { TextInput } from '@components/text-input';
import { getCurrentDate } from '@utils/index';
import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';

import styles from './styles.module.css';

export const SearchPanel = () => {
  const [searchValue, setSearchValue] = useState('');
  const [date, setDate] = useState(getCurrentDate());

  const currentDate = useMemo(() => getCurrentDate(), []);

  const onSearchValueChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  }, []);

  const onDateChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  }, []);

  return (
    <div className={styles.container}>
      <TextInput className={styles['search-value']} value={searchValue} onChange={onSearchValueChange} />
      <div className={styles.controls}>
        <DateInput value={date} max={currentDate} onChange={onDateChange} />
        <Button text="Search" />
      </div>
    </div>
  );
};
