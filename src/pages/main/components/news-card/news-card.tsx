import React, { FC } from 'react';
import styles from './styles.module.css';

export const NewsCard: FC = () => (
  <div className={styles.card}>
    <span className={styles['card-author']}>Author</span>
    <span className={styles['card-title']}>Title</span>
    <span className={styles['card-date']}>Date</span>
  </div>
);
