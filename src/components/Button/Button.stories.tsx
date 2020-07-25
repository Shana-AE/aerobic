import React from 'react';
import { action } from '@storybook/addon-actions';

import Button from './Button';

export const defaultButton = () => (
  <Button onClick={action('clicked')}>default button</Button>
);

defaultButton.story = {
  name: 'Button',
};

export const buttonWithSize = () => (
  <>
    <Button size='lg'>large Button</Button>
    <Button size='sm'>small Button</Button>
  </>
);

buttonWithSize.story = {
  name: '不同尺寸的Button',
  parameters: {
    info: {
      inline: false,
    },
  },
};

export const buttonWithType = () => (
  <>
    <Button btnType='default'>Default Button</Button>
    <Button btnType='primary'>Primary Button</Button>
    <Button btnType='danger'>Danger Button</Button>
    <Button btnType='warning'>Warning Button</Button>
    <Button btnType='link' href='http://google.com'>
      Google
    </Button>
  </>
);

buttonWithType.story = {
  name: '不同类型的Button',
};

export default {
  title: 'Button',
  component: Button,
};
