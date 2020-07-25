import React from 'react';
import { action } from '@storybook/addon-actions';
import { AutoComplete } from './AutoComplete';

export const SimpleComplete = () => {
  const ships = [
    'shimakaze',
    'poi',
    'ooi',
    'ooyodo',
    'kaga',
    'akagi',
    'zuikaku',
    'shoukaku',
    'yukikaze',
    'fubuki',
    'murakumo',
    'yamato',
  ];
  const handleFetch = (query: string) => {
    return ships.filter(name => name.includes(query))
  }
  return (
    <AutoComplete fetchSuggestion={handleFetch} onSelect={action('selected')} />
  )
};

SimpleComplete.storyName = 'SimpleAutoComplete';

export default {
  title: 'AutoComplete',
  component: AutoComplete,
}
