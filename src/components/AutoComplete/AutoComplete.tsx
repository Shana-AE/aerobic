import React, { FC, useState, ChangeEvent } from 'react';
import Input, { InputProps } from '../Input/Input';

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestion: (str: string) => string[];
  onSelect?: (item: string) => void;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestion, onSelect, value, ...restProps } = props;

  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  console.log(suggestions);
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

  const handleSelect = (item: string) => {
    setInputValue(item);
    setSuggestions([]);
    if (onSelect) {
      onSelect(item);
    }
  }

  const generateDropDown = () => (
    <ul>
      {suggestions.map((item, index) => (
        <li key={index} onClick={() => handleSelect(item)}>{item}</li>
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
