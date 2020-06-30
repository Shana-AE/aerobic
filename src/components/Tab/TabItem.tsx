import React, { useContext } from 'react';
import classNames from 'classnames';

import { TabContext } from './Tab';

export interface TabItemProps {
  index?: string;
  label: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

const TabItem: React.FC<TabItemProps> = (props) => {
  const { index, label, children, className, disabled, style } = props;
  const context = useContext(TabContext);
  const classes = classNames('ae-tab-item', {
    disabled,
    active: context.index === index,
  }, className);

  const handleClick = () => {
    if (context.onSelect && !disabled && typeof index === 'string') {
      context.onSelect(index);
    }
  };

  return (
    <li className={classes} style={style}>
      <div className='ae-tab-item-label' onClick={handleClick}>
        {label}
      </div>
      <div className='ae-tab-item-content'>
        {children}
      </div>
    </li>
  );
};

TabItem.displayName = 'TabItem';

export default TabItem;
