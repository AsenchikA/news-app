import React from 'react';
import { NewsCard } from '../news-card';
import styles from './styles.module.css';

export const NeewsFeed = () => (
  <div className={styles.feed}>
    <div className={styles['cards-container']}>
      <NewsCard />
    </div>
  </div>
);
