import React from 'react';
import classNames from 'classnames';

interface MenuItemProps {
  index?: number;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { index, disabled, className, children, style } = props;
  const classes = classNames('ae-menu-item', {
    disabled,
  }, classNames);

  return (
    <li className={classes} style={style}>
      {children}
    </li>
  )
};

export default MenuItem;
