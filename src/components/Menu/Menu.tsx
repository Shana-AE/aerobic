import React, { createContext, useState } from 'react';
import classNames from 'classnames';

import { MenuItemProps } from './MenuItem';

type MenuMode = 'horizontal' | 'vertical';
type onSelectCallback = (selectedIndex: number) => void;

export interface MenuProps {
  defaultIndex?: number;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  onSelect?: onSelectCallback;
}

interface IMenuContext {
  index: number;
  onSelect?: onSelectCallback;
  mode?: MenuMode;
}

export const MenuContext = createContext<IMenuContext>({ index: 0 });

const Menu: React.FC<MenuProps> = (props) => {
  const { defaultIndex, className, mode, style, children, onSelect } = props;
  const [currentActive, setActive] = useState(defaultIndex);

  const classes = classNames(
    'ae-menu',
    {
      'ae-menu-vertical': mode === 'vertical',
      'ae-menu-horizontal': mode !== 'vertical',
    },
    className,
  );

  const handleClick = (index: number) => {
    setActive(index);
    if (onSelect) {
      onSelect(index);
    }
  };

  const passContext: IMenuContext = {
    index: currentActive ? currentActive : 0,
    onSelect: handleClick,
    mode,
  };

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<
        MenuItemProps
      >;
      const { displayName } = childElement.type;
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, {
          index,
        });
      } else {
        console.error(
          'Warning: Menu has a child which is not a MenuItem component',
        );
      }
    });
  };

  return (
    <ul className={classes} style={style} data-testid='test-menu'>
      <MenuContext.Provider value={passContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: 0,
  mode: 'horizontal',
};

export default Menu;
