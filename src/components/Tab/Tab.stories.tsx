import React from 'react';
import { action } from '@storybook/addon-actions';

import Tab from './Tab';
import TabItem from './TabItem';

import Button from '../Button/Button';

const customTabLabel = <Button btnType='primary'>Button Tab</Button>;

export const lineTab = () => (
  <Tab
    mode='line'
    onSelect={action('selected')}
  >
    <TabItem label='card1'>this is content one</TabItem>
    <TabItem label='card2'>this is content two</TabItem>
    <TabItem label={customTabLabel}>this is a custom label</TabItem>
    <TabItem label='card3' disabled>
      this is content three
    </TabItem>
  </Tab>
);

lineTab.story = {
  name: '线型Tab',
};

export const boxTab = () => (
  <Tab
    mode='box'
    onSelect={action('selected')}
  >
    <TabItem label='card1'>this is content one</TabItem>
    <TabItem label='card2'>this is content two</TabItem>
    <TabItem label='card3' disabled>
      this is content three
    </TabItem>
  </Tab>
);

boxTab.story = {
  name: '盒型Tab',
};

export default {
  title: 'Tab',
  component: Tab,
};
