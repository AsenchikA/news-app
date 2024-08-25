import React, { FC, SelectHTMLAttributes } from 'react';

import classNames from 'classNames';

import styles from './styles.module.css';

interface IProps extends SelectHTMLAttributes<HTMLSelectElement> {
  optionList: { value: string | number; caption: string }[];
  containerClassName?: string;
}

export const Select: FC<IProps> = ({ className, containerClassName, optionList, ...props }) => (
  <div className={classNames(styles.container, containerClassName)}>
    <select className={classNames(styles.select, className)} {...props}>
      <option data-testid="default-option" value="" hidden>
        Select value
      </option>
      {optionList.map(({ value, caption }) => (
        <option key={value} value={value}>
          {caption}
        </option>
      ))}
    </select>
  </div>
);
