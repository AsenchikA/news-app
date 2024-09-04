import { Button } from '@components/button';
import { TextInput } from '@components/text-input';
import { useAppDispatch } from '@store/hooks';
import { fetchArticles } from '@store/slices/articles';
import React, { ChangeEvent, useCallback, useState, FormEvent } from 'react';
import { DateSelect } from '../date-select';
import { SourceSelect } from '../source-select';

import styles from './styles.module.css';

export const SearchPanel = () => {
  const dispatch = useAppDispatch();

  const [searchValue, setSearchValue] = useState('');
  const [fromDateTime, setFromDateTime] = useState('');
  const [toDateTime, setToDateTime] = useState('');
  const [source, setSource] = useState('');

  const onSearchValueChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  }, []);

  const onDatesChange = useCallback((from: string, to: string) => {
    setFromDateTime(from);
    setToDateTime(to);
  }, []);

  const onSearchSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      dispatch(fetchArticles({ searchInput: searchValue, from: fromDateTime, to: toDateTime, source }));
    },
    [searchValue, fromDateTime, toDateTime, source]
  );

  return (
    <form className={styles.container} onSubmit={onSearchSubmit}>
      <TextInput className={styles['search-value']} value={searchValue} onChange={onSearchValueChange} />
      <DateSelect className={styles['date-select']} onChange={onDatesChange} />
      <SourceSelect className={styles['source-select']} value={source} onChange={setSource} />
      <Button text="Search" type="submit" />
    </form>
  );
};
