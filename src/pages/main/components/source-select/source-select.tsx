import { Select } from '@components/select';
import { useAppSelector } from '@store/hooks';
import { selectSources } from '@store/slices/sources';
import React, { FC, useCallback, useMemo, ChangeEvent } from 'react';

interface IProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const SourceSelect: FC<IProps> = ({ className, value, onChange }) => {
  const sourceList = useAppSelector(selectSources);

  const optionList = useMemo(() => sourceList.map(({ id, name }) => ({ value: id, caption: name })), [sourceList]);

  const onSelectChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      onChange(event.target.value);
    },
    [onChange]
  );

  return (
    <Select
      containerClassName={className}
      multiple={true}
      value={value}
      optionList={optionList}
      onChange={onSelectChange}
    />
  );
};
