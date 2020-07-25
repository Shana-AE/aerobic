import React, { FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import classNames from 'classnames';

export type ButtonSize = 'lg' | 'sm';

export type ButtonType = 'primary' | 'default' | 'warning' | 'danger' | 'link';

interface BaseButtonProps {
  className?: string;
  /** disable button */
  disabled?: boolean;
  /** set button size */
  size?: ButtonSize;
  /** set button type */
  btnType?: ButtonType;
  children?: React.ReactNode;
  href?: string;
}

type NativeButtonProps = BaseButtonProps &
  ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps &
  AnchorHTMLAttributes<HTMLElement>;

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

/**
 * Button Component
 * ## Button header
 * ~~~js
 * console.log('jsdoc example');
 * import Button from 'aerobic';
 * ~~~
 */
export const Button: FC<ButtonProps> = (props) => {
  const {
    className,
    disabled,
    size,
    btnType,
    children,
    href,
    ...restProps
  } = props;
  const classes = classNames('ae-btn', {
    [`ae-btn-${btnType}`]: btnType,
    [`ae-btn-${size}`]: size,
    disabled: btnType === 'link' && disabled,
  }, className);

  if (btnType === 'link' && href) {
    return (
      <a href={href} className={classes} {...restProps}>
        {children}
      </a>
    );
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    );
  }
};

Button.defaultProps = {
  disabled: false,
  btnType: 'default',
};

export default Button;
