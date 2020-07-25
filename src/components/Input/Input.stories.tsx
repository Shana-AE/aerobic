import React, { useState } from 'react';
import { action } from '@storybook/addon-actions';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import Input from './Input';

library.add(faSearch);

const ControlledInput = () => {
  const [value, setValue] = useState('');
  return (
    <Input
      value={value}
      defaultValue={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};

export const defaultInput = () => (
  <>
    <Input
      style={{ width: '300px' }}
      placeholder='placeholder'
      onChange={action('changed')}
    />
    <ControlledInput />
  </>
);

defaultInput.storyName = 'Input';

export const disabledInput = () => (
  <Input style={{ width: '300px' }} placeholder='disabled input' disabled />
);

disabledInput.storyName = '禁用的Input';

export const iconInput = () => (
  <Input
    style={{ width: '300px' }}
    placeholder='input with icon'
    icon='search'
  />
);

iconInput.storyName = '带图标的Input';

export const sizeInput = () => (
  <>
    <Input style={{ width: '300px' }} defaultValue='large input' size='lg' />
    <Input style={{ width: '300px' }} defaultValue='small input' size='sm' />
  </>
);

sizeInput.storyName = '不同大小的Input';

export const pandInput = () => (
  <>
    <Input
      style={{ width: '300px' }}
      defaultValue='prepend text'
      prepend='https://'
    />
    <Input style={{ width: '300px' }} defaultValue='google' append='.com' />
  </>
);

pandInput.storyName = '带前后缀的Input';

export default {
  title: 'Input',
  component: Input,
};
