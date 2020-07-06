import React, { useContext, useState, FunctionComponentElement } from 'react';
import classNames from 'classnames';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

import { MenuContext } from './Menu';
import { MenuItemProps } from './MenuItem';
import Transition from '../Transition/Transition';

import Icon from '../Icon/Icon';

library.add(faAngleDown);

export interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const { index, title, className, children } = props;
  const context = useContext(MenuContext);
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>;
  const isOpened =
    index && context.mode === 'vertical'
      ? openedSubMenus.includes(index)
      : false;
  const [menuOpen, setMenuOpen] = useState(isOpened);
  const classes = classNames(
    'ae-menu-item ae-submenu-item',
    {
      active: context.index === index,
      opened: menuOpen,
      vertical: context.mode === 'vertical',
    },
    className,
  );

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(!menuOpen);
  };

  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setMenuOpen(toggle);
    }, 300);
  };

  const clickEvents =
    context.mode === 'vertical'
      ? {
          onClick: handleClick,
        }
      : {};

  const hoverEvents =
    context.mode !== 'vertical'
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true);
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false);
          },
        }
      : {};

  const renderChildren = () => {
    const subMenuClasses = classNames('ae-submenu', {
      'ae-menu-opened': menuOpen,
    });
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      if (childElement.type.displayName === 'MenuItem') {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`,
        });
      } else {
        console.error(
          'Warning: SubMenu has a child which is not a MenuItem component',
        );
      }
    });
    return (
      <Transition
        in={menuOpen}
        timeout={300}
        animation='zoom-in-top'
      >
        <ul className={subMenuClasses}>{childrenComponent}</ul>
      </Transition>
    );
  };

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className='ae-submenu-title' {...clickEvents}>
        {title}
        <Icon icon="angle-down" className="arrow-icon"/>
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = 'SubMenu';

export default SubMenu;
