import React, { useState } from 'react';
import classNames from 'classnames';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import Icon from '../Icon/Icon';
import Transition from '../Transition/Transition';

library.add(faTimes);

export type AlertType =
  | 'primary'
  | 'success'
  | 'default'
  | 'danger'
  | 'warning';

export interface BaseAlertProps {
  type?: AlertType;
  className?: string;
  message?: string | React.ReactNode;
  description?: string | React.ReactNode;
  closable?: boolean;
  children?: React.ReactNode;
}

export const Alert: React.FC<BaseAlertProps> = (props) => {
  const { type, className, message, description, children, closable } = props;
  const [closed, setClosed] = useState(false);

  const closeHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    setClosed(true);
  };

  const CloseIcon = (
    <button
      type='button'
      className='ae-alert-close-icon'
      onClick={closeHandler}
    >
      <Icon icon='times' />
    </button>
  );


  const classes = classNames(
    'ae-alert',
    {
      [`ae-alert-${type}`]: type,
    },
    className,
  );


  if (message && description) {
    return (
      <Transition in={!closed} timeout={300} animation='zoom-in-top'>
        <div className={classes}>
          <span className='ae-alert-message'>{message}</span>
          <span className='ae-alert-description'>{description}</span>
          {closable && CloseIcon}
        </div>
      </Transition>
    );
  } else {
    return (
      <Transition in={!closed} timeout={300} animation='zoom-in-top'>
        <div className={classes}>
          {children}
          {closable && CloseIcon}
        </div>
      </Transition>
    );
  }
};

Alert.defaultProps = {
  type: 'default',
};

export default Alert;
