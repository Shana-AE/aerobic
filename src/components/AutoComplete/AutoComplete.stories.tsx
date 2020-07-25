import React from 'react';
import { action } from '@storybook/addon-actions';
import { AutoComplete, DataSourceType } from './AutoComplete';

interface ShipProps {
  value: string;
  level: number;
}

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
  const shipsWithLevel = [
    { value: 'shimakaze', level: 175 },
    { value: 'poi', level: 105 },
    { value: 'ooi', level: 131 },
    { value: 'ooyodo', level: 110 },
    { value: 'kaga', level: 121 },
    { value: 'akagi', level: 122 },
    { value: 'zuikaku', level: 135 },
    { value: 'shoukaku', level: 135 },
    { value: 'yukikaze', level: 109 },
    { value: 'fubuki', level: 98 },
    { value: 'murakumo', level: 110 },
    { value: 'yamato', level: 121 },
  ];

  const handleFetch = (query: string) => {
    return ships
      .filter((name) => name.includes(query))
      .map((name) => ({ value: name }));
  };

  // const handleFetch = (query: string) => {
  //   return shipsWithLevel.filter((ship) => ship.value.includes(query));
  // };

  // const renderOption = (item: DataSourceType) => {
  //   const shipWithLevelItem = item as DataSourceType<ShipProps>;
  //   return (
  //     <>
  //       <h2>Name: {shipWithLevelItem.value}</h2>
  //       <p>Level: {shipWithLevelItem.level}</p>
  //     </>
  //   );
  // };

  return (
    <AutoComplete
      fetchSuggestion={handleFetch}
      onSelect={action('selected')}
      // renderOption={renderOption}
    />
  );
};

SimpleComplete.storyName = 'SimpleAutoComplete';

export default {
  title: 'AutoComplete',
  component: AutoComplete,
};
