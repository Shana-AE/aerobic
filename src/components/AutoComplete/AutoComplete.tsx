import React, { FC, useState, ChangeEvent, ReactElement } from 'react';
import Input, { InputProps } from '../Input/Input';

interface DataSourceObject {
  value: string;
}

export type DataSourceType<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestion: (str: string) => DataSourceType[];
  onSelect?: (item: DataSourceType) => void;
  renderOption?: (item: DataSourceType) => ReactElement;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestion,
    onSelect,
    value,
    renderOption,
    ...restProps
  } = props;

  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    if (value) {
      const results = fetchSuggestion(value);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value);
    setSuggestions([]);
    if (onSelect) {
      onSelect(item);
    }
  };

  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };

  const generateDropDown = () => (
    <ul>
      {suggestions.map((item, index) => (
        <li key={index} onClick={() => handleSelect(item)}>
          {renderTemplate(item)}
        </li>
      ))}
    </ul>
  );

  return (
    <div className='ae-auto-complete'>
      <Input value={inputValue} onChange={handleChange} {...restProps} />
      {suggestions.length > 0 && generateDropDown()}
    </div>
  );
};

export default AutoComplete;
