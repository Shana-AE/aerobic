import React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

import Icon from './Icon';

library.add(faArrowDown);

export const themedIcons = () => (
  <>
    <Icon icon='arrow-down' theme='primary' />
    <Icon icon='arrow-down' theme='secondary' />
    <Icon icon='arrow-down' theme='light' />
    <Icon icon='arrow-down' theme='dark' />
    <Icon icon='arrow-down' theme='info' />
    <Icon icon='arrow-down' theme='success' />
    <Icon icon='arrow-down' theme='warning' />
    <Icon icon='arrow-down' theme='danger' />
  </>
);

themedIcons.story = {
  name: '不同主题的Icon',
};

export const iconWithSize = () => (
  <>
    <Icon icon='arrow-down' size='2x' />
    <Icon icon='arrow-down' size='3x' />
    <Icon icon='arrow-down' size='10x' />
    <Icon icon='arrow-down' size='xs' />
    <Icon icon='arrow-down' size='sm' />
    <Icon icon='arrow-down' size='lg' />
  </>
);

iconWithSize.story = {
  name: '不同尺寸的Icon',
};

export default {
  title: 'Icon',
  component: Icon,
};
