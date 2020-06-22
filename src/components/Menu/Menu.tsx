import React from 'react';
import classNames from 'classnames';

type MenuMode = 'horizontal' | 'vertical';

interface MenuProps {
  defaultIndex?: number;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  onSelect?: (selectedIndex: number) => void;
}

const Menu: React.FC<MenuProps> = (props) => {
  const { defaultIndex, className, mode, style, children, onSelect } = props;
  const classes = classNames(
    'ae-menu',
    {
      'ae-menu-vertical': mode === 'vertical',
    },
    className,
  );

  return (
    <ul className={classes} style={style}>
      {children}
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal',
}

export default Menu;
