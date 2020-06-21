import React, { useState } from 'react';
import classNames from 'classnames';

export enum AlertType {
  Primary = 'primary',
  Success = 'success',
  Default = 'default',
  Danger = 'danger',
  Warning = 'warning',
}

interface BaseAlertProps {
  type?: string;
  className?: string;
  message?: string | React.ReactNode;
  description?: string | React.ReactNode;
  closable?: boolean;
  children?: React.ReactNode;
}

const Alert: React.FC<BaseAlertProps> = (props) => {
  const { type, className, message, description, children, closable } = props;
  const [closed, setClosed] = useState(false);

  const closeHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    setClosed(true);
  }

  const CloseIcon = (
    <button type='button' className='ae-alert-close-icon' onClick={closeHandler}>
      X
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
    return closed ? null : (
      <div className={classes}>
        <span className='ae-alert-message'>{message}</span>
        <span className='ae-alert-description'>{description}</span>
        {closable && CloseIcon}
      </div>
    );
  } else {
    return closed ? null :(
      <div className={classes}>
        {children}
        {closable && CloseIcon}
      </div>
    );
  }
};

Alert.defaultProps = {
  type: AlertType.Default,
};

export default Alert;
