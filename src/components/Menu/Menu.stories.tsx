import React from 'react';
import { action } from '@storybook/addon-actions';

import Menu from './Menu';
import SubMenu from './SubMenu';
import MenuItem from './MenuItem';

export const defaultMenu = () => (
  <Menu onSelect={action('select')}>
    <MenuItem>cool link 1</MenuItem>
    <MenuItem disabled>cool link 2</MenuItem>
    <SubMenu title='dropdown'>
      <MenuItem>dropdown 1</MenuItem>
      <MenuItem>dropdown 2</MenuItem>
    </SubMenu>
    <MenuItem>cool link 3</MenuItem>
  </Menu>
);

defaultMenu.story = {
  name: 'Menu',
};

export const verticalMenu = () => (
  <Menu
    onSelect={(index) => {
      action(index);
    }}
    mode='vertical'
    defaultOpenSubMenus={['2']}
  >
    <MenuItem>vertical cool link 1</MenuItem>
    <MenuItem disabled>vertical cool link 2</MenuItem>
    <SubMenu title='dropdown'>
      <MenuItem>dropdown 1</MenuItem>
      <MenuItem>dropdown 2</MenuItem>
    </SubMenu>
    <MenuItem>vertical cool link 3</MenuItem>
  </Menu>
);

verticalMenu.story = {
  name: '垂直Menu',
};

export default {
  title: 'Menu',
  component: Menu,
};
