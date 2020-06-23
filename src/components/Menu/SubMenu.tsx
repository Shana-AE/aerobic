import React, { useContext, FunctionComponentElement } from 'react';
import classNames from 'classnames';

import { MenuContext } from './Menu';
import { MenuItemProps } from './MenuItem';

export interface SubMenuProps {
  index?:number;
  title: string;
  className?: string;
}

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const { index, title, className, children } = props;
  const context = useContext(MenuContext);
  const classes = classNames('ae-menu-item ae-submenu-item', {
    'active': context.index === index,
  }, className);

  const renderChildren = () => {
    const childrenComponent = React.Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      if (childElement.type.displayName === 'MenuItem') {
        return childElement;
      } else {
        console.error('Warning: SubMenu has a child which is not a MenuItem component');
      }
    });
    return (
      <ul className='ae-submenu'>
        {childrenComponent}
      </ul>
    )
  }

  return (
    <li key={index} className={classes}>
      <div className='ae-submenu-title'>
        {title}
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = 'SubMenu';

export default SubMenu;
