import { IArticle } from '@app-types/index';
import React, { FC } from 'react';
import styles from './styles.module.css';

interface IProps {
  model: IArticle;
}

export const ArticleCard: FC<IProps> = ({ model }) => (
  <div className={styles.card}>
    <span className={styles['card-author']}>{model.author}</span>
    <a className={styles['card-title']} href={model.url} target="_blank" rel="noreferrer">
      <span>{model.title}</span>
    </a>
    <span className={styles['card-date']}>
      {new Date(model.publishedAt).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      })}
    </span>
  </div>
);
