import React, { FC, InputHTMLAttributes } from 'react';

import classNames from 'classNames';

import styles from './styles.module.css';

export const TextInput: FC<InputHTMLAttributes<HTMLInputElement>> = ({ className, ...props }) => (
  <input className={classNames(styles.input, className)} type="text" {...props} />
);
