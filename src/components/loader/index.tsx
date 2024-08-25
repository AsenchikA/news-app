import React, { FC } from 'react';

import classNames from 'classNames';

import styles from './styles.module.css';

interface ILoaderProps {
  className?: string;
}

export const Loader: FC<ILoaderProps> = ({ className }) => (
  <div data-testid="loader" className={classNames(styles.loader, className)} />
);
