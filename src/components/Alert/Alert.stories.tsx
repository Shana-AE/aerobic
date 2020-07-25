import React from 'react';
import {} from '@storybook/csf';

import Alert from './Alert';

export const alertWithTypes = () => (
  <>
    <Alert type='default'>Default Alert</Alert>
    <Alert type='primary'>Primary Alert</Alert>
    <Alert type='success'>Success Alert</Alert>
    <Alert type='warning'>Warning Alert</Alert>
    <Alert type='danger'>Danger Alert</Alert>
  </>
);

alertWithTypes.story = {
  name: '不同类型的Alert',
};

export const closableAlert = () => (
  <Alert type='default' closable>
    Closable Alert
  </Alert>
);

closableAlert.story = {
  name: '可以关闭的Alert',
};

export const alertWithDescription = () => (
  <Alert message='Alert Message' description='Alert Description' />
);

alertWithDescription.story = {
  name: '有描述的Alert',
};

export default {
  title: 'Alert',
  component: Alert,
};
