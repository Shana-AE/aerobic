import React, { useContext, useState, FunctionComponentElement } from 'react';
import classNames from 'classnames';

import { MenuContext } from './Menu';
import { MenuItemProps } from './MenuItem';

export interface SubMenuProps {
  index?:number;
  title: string;
  className?: string;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const [ menuOpen, setMenuOpen ] = useState(false);
  const { index, title, className, children } = props;
  const context = useContext(MenuContext);
  const classes = classNames('ae-menu-item ae-submenu-item', {
    'active': context.index === index,
  }, className);

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
  
  const clickEvents = context.mode === 'vertical' ? {
    onClick: handleClick,
  }: {};

  const hoverEvents = context.mode !== 'vertical' ? {
    onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
    onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false)},
  }: {};

  const renderChildren = () => {
    const subMenuClasses = classNames('ae-submenu', {
      'ae-menu-opened': menuOpen,
    })
    const childrenComponent = React.Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      if (childElement.type.displayName === 'MenuItem') {
        return childElement;
      } else {
        console.error('Warning: SubMenu has a child which is not a MenuItem component');
      }
    });
    return (
      <ul className={subMenuClasses}>
        {childrenComponent}
      </ul>
    )
  }

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className='ae-submenu-title' {...clickEvents}>
        {title}
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = 'SubMenu';

export default SubMenu;
