import React, {
  FC,
  ReactElement,
  InputHTMLAttributes,
  ChangeEvent,
} from 'react';
import classNames from 'classnames';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import Icon from '../Icon/Icon';

type InputSize = 'lg' | 'sm';

// ignore size property on InputHTMLAttributes
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  /** 是否禁用Input */
  disabled?: boolean;
  /** 设置input大小， lg或sm */
  size?: InputSize;
  /** 添加图标，在右侧添加图标，用于提示 */
  icon?: IconProp;
  /** 添加前缀，用于配置一些固定组合 */
  prepend?: string | ReactElement;
  /** 添加后缀，用于配置一些固定组合 */
  append?: string | ReactElement;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Input输入框 通过鼠标或键盘输入内容，基础的表单域的封装
 *
 * ~~~js
 * // 如此引用
 * import { Input } from 'aerobic';
 * ~~~
 *
 * 支持 HTMLInput的所有属性
 */
export const Input: FC<InputProps> = (props) => {
  const { disabled, size, icon, prepend, append, style, ...restProps } = props;

  const classes = classNames('ae-input-wrapper', {
    [`ae-input-${size}`]: size,
    disabled,
    'ae-input-group': prepend || append,
    'ae-input-group-append': !!append,
    'ae-input-group-prepend': !!prepend,
  });

  const fixControlledValue = (value: any) => {
    if (value == null) {
      return '';
    }
    return value;
  };

  if ('value' in props) {
    delete restProps.defaultValue;
    restProps.value = fixControlledValue(props.value);
  }

  return (
    <div className={classes} style={style}>
      {prepend && <div className='ae-input-group-prepend'>{prepend}</div>}
      {icon && (
        <div className='ae-icon-wrapper'>
          <Icon icon={icon} title={`title-${icon}`} />
        </div>
      )}
      <input className='ae-input-body' disabled={disabled} {...restProps} />
      {append && <div className='ae-input-group-append'>{append}</div>}
    </div>
  );
};

export default Input;
