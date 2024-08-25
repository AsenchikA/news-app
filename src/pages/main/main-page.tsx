import React, { FC, useEffect } from 'react';
import { useAppDispatch } from '@store/hooks';
import { fetchArticles } from '@store/slices/articles';
import { fetchSources } from '@store/slices/sources';
import { NeewsFeed } from './components/news-feed/news-feed';
import { SearchPanel } from './components/search-panel';
import styles from './styles.module.css';

export const MainPage: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSources());
    dispatch(fetchArticles({}));
  }, []);

  return (
    <div className={styles['main-page-container']}>
      <SearchPanel />
      <NeewsFeed />
      <div />
    </div>
  );
};
