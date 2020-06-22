import React, { useContext } from 'react';
import classNames from 'classnames';

import { MenuContext } from './Menu';

interface MenuItemProps {
  index: number;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { index, disabled, className, children, style } = props;
  const context = useContext(MenuContext);
  const classes = classNames(
    'ae-menu-item',
    {
      disabled,
      'active': context.index === index,
    },
    className,
  );

  const handleClick = () => {
    if (context.onSelect && !disabled) {
      context.onSelect(index);
    }
  }

  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  );
};

export default MenuItem;
