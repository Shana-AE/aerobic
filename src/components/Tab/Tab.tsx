import React, { createContext, useState } from 'react';
import classNames from 'classnames';

import { TabItemProps } from './TabItem';

type onSelectCallback = (selectIndex: string) => any;
type MenuMode = 'line' | 'box';

export interface TabProps {
  defaultIndex?: string;
  className?: string;
  mode?: MenuMode;
  children: React.ReactNode;
  style?: React.CSSProperties;
  onSelect?: onSelectCallback;
}

interface ITabContext {
  index: string;
  onSelect?: onSelectCallback;
  mode?: MenuMode;
}

export const TabContext = createContext<ITabContext>({ index: '0' });

const Tab: React.FC<TabProps> = (props) => {
  const { defaultIndex, className, mode, children, onSelect, style } = props;

  const [activeIndex, setActive] = useState(defaultIndex);
  const classes = classNames(
    'ae-tab',
    {
      'ae-tab-line': mode !== 'box',
      'ae-tab-box': mode === 'box',
    },
    className,
  );

  const handleClick = (index: string) => {
    setActive(index);
    if (onSelect) {
      onSelect(index);
    }
  };

  const passContext: ITabContext = {
    index: activeIndex ? activeIndex : '0',
    onSelect: handleClick,
    mode,
  };

  const renderChildren = () => {
    return React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<
        TabItemProps
      >;
      const { displayName } = childElement.type;
      if (displayName === 'TabItem') {
        return React.cloneElement(childElement, {
          index: i.toString(),
        });
      } else {
        console.error(
          'Warning: Tab has a child which is not a TabItem component',
        );
      }
    });
  };

  return (
    <ul className={classes} style={style}>
      <TabContext.Provider value={passContext}>
        {renderChildren()}
      </TabContext.Provider>
    </ul>
  );
};

Tab.defaultProps = {
  defaultIndex: '0',
  mode: 'line',
};

export default Tab;
