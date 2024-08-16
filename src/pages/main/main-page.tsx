import React, { FC } from 'react';
import { NeewsFeed } from './components/news-feed/news-feed';
import { SearchPanel } from './components/search-panel';
import styles from './styles.module.css';

export const MainPage: FC = () => (
  <div className={styles['main-page-container']}>
    <SearchPanel />
    <NeewsFeed />
    <div />
  </div>
);
