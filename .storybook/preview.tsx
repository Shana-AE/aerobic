import React from 'react';
import { addDecorator } from '@storybook/react';

import '../src/styles/index.scss';

const wrapperStyle: React.CSSProperties = {
  padding: '20px 40px',
}

const storyWrapper = (storyFn: any) => (
  <div style={wrapperStyle}>
    <h3>组件演示</h3>
    {storyFn()}
  </div>
);

addDecorator(storyWrapper);
