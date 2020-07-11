import React from 'react';
import { addDecorator } from '@storybook/react';

import '../src/styles/index.scss';

const styles: React.CSSProperties = {
  textAlign: 'center',
};

const CenterDecorator = (storyFn: any) => <div style={styles}>{storyFn()}</div>;

addDecorator(CenterDecorator);
