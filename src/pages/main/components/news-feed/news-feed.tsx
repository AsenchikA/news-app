import { Loader } from '@components/loader';
import { useAppSelector } from '@store/hooks';
import { selectArticles, selectArticlesStatus } from '@store/slices/articles';
import React from 'react';
import { ArticleCard } from '../article-card';
import styles from './styles.module.css';

export const NeewsFeed = () => {
  const articles = useAppSelector(selectArticles);
  const loadingStatus = useAppSelector(selectArticlesStatus);

  if (loadingStatus === 'idle' || loadingStatus === 'pending') {
    return (
      <div className={styles['loader-container']}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.feed}>
      <div className={styles['cards-container']}>
        {articles.map((article) => (
          <ArticleCard key={`${article.title}_${article.publishedAt}`} model={article} />
        ))}
        {articles.length === 0 && <div>No results found. Please try another search.</div>}
      </div>
    </div>
  );
};
