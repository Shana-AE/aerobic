import React from 'react';
import classNames from 'classnames';
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';

export type ThemeProps =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'
  | 'light'
  | 'dark';

export interface IconProps extends FontAwesomeIconProps {
  theme?: ThemeProps;
}


/**
 * ## Icon Component
 *
 * you should import faIcons before using it
 *
 * e.g.
 *
 * ~~~js
 * import { library } from '@fortawesome/fontawesome-svg-core';
 * import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
 *
 * library.add(faArrowDown);
 * ~~~
 */
export const Icon: React.FC<IconProps> = (props) => {
  const { className, theme, ...restProps } = props;
  const classes = classNames('ae-icon', {
    [`ae-icon-${theme}`]: theme,
  }, className);
  return (
    <FontAwesomeIcon className={classes} {...restProps} />
  );
};

export default Icon;
