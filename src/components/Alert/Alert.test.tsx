import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Alert, { BaseAlertProps, AlertType } from './Alert';

describe('test Alert component', () => {
  it('should render the correct default alert', () => {
    const wrapper = render(<Alert>default alert</Alert>);
    const element = wrapper.getByText('default alert');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('ae-alert ae-alert-default');
  });

  it('should render the correct alert based on different props', () => {
    const testProps: BaseAlertProps = {
      type: AlertType.Success,
      className: 'test',
    };
    const wrapper = render(<Alert {...testProps}>success alert</Alert>);
    const element = wrapper.getByText('success alert');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('ae-alert ae-alert-success test');
  });

  it('should render message and the description', () => {
    const testProps: BaseAlertProps = {
      message: 'alert message',
      description: 'alert description'
    };
    const wrapper = render(<Alert {...testProps}/>);
    const message = wrapper.getByText('alert message');
    const { container } = wrapper;
    const description = wrapper.getByText('alert description');

    expect(container.firstChild).toHaveClass('ae-alert ae-alert-default');

    expect(message).toBeInTheDocument();
    expect(message).toHaveClass('ae-alert-message');

    expect(description).toBeInTheDocument();
    expect(description).toHaveClass('ae-alert-description');
  });

  it('should render the close button if closable set to be true', () => {
    const testProps: BaseAlertProps = {
      closable: true,
    }

    const wrapper = render(<Alert {...testProps}>closable alert</Alert>);
    const element = wrapper.getByText('closable alert');
    const { container } = wrapper;
    const closeButton = container.querySelector('button');

    expect(element).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton!);
    expect(element).not.toBeInTheDocument();
  });
})