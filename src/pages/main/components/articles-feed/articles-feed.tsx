import { Loader } from '@components/loader';
import { useAppSelector } from '@store/hooks';
import { selectArticles, selectArticlesStatus } from '@store/slices/articles';
import { selectSourcesStatus } from '@store/slices/sources';
import React from 'react';
import { ArticleCard } from '../article-card';
import styles from './styles.module.css';

export const ArticlesFeed = () => {
  const articles = useAppSelector(selectArticles);
  const articlesLoadingStatus = useAppSelector(selectArticlesStatus);
  const sourcesLoadingStatus = useAppSelector(selectSourcesStatus);

  if (
    articlesLoadingStatus === 'idle' ||
    articlesLoadingStatus === 'pending' ||
    sourcesLoadingStatus === 'idle' ||
    sourcesLoadingStatus === 'pending'
  ) {
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
        {(articlesLoadingStatus === 'rejected' || sourcesLoadingStatus === 'rejected') && (
          <div>An error has occurred. Please try again later.</div>
        )}
      </div>
    </div>
  );
};
