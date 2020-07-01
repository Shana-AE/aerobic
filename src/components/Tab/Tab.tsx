import React, { useState } from 'react';
import classNames from 'classnames';

import { TabItemProps } from './TabItem';

type onSelectCallback = (selectIndex: number) => any;
type MenuMode = 'line' | 'box';

export interface TabProps {
  defaultIndex?: number;
  className?: string;
  mode?: MenuMode;
  children: React.ReactNode;
  style?: React.CSSProperties;
  onSelect?: onSelectCallback;
}

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

  const handleClick = (
    e: React.MouseEvent,
    index: number,
    disabled: boolean | undefined,
  ) => {
    if (!disabled) {
      setActive(index);
      if (onSelect) {
        onSelect(index);
      }
    }
  };

  const renderNavLink = () => {
    return React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<
        TabItemProps
      >;
      const { label, disabled, className } = childElement.props;
      const classes = classNames(
        'ae-tab-item',
        {
          disabled,
          active: activeIndex === i,
        },
        className,
      );
      return (
        <li className={classes} onClick={(e) => handleClick(e, i, disabled)}>
          {label}
        </li>
      );
    });
  };

  const renderContent = () => {
    return React.Children.map(children, (child, i) => {
      if (activeIndex === i) {
        return child;
      }
    });
  };

  return (
    <div className={classes} style={style}>
      <ul className='ae-tab-nav'>{renderNavLink()}</ul>
      <div className='ae-tabs-content'>{renderContent()}</div>
    </div>
  );
};

Tab.defaultProps = {
  defaultIndex: 0,
  mode: 'line',
};

export default Tab;
