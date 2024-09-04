import React, { FC, useEffect } from 'react';
import { useAppDispatch } from '@store/hooks';
import { fetchArticles } from '@store/slices/articles';
import { fetchSources } from '@store/slices/sources';
import { ArticlesFeed } from './components/articles-feed/articles-feed';
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
      <ArticlesFeed />
      <div />
    </div>
  );
};
