import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { Input, InputProps } from './Input';

const defaultProps: InputProps = {
  onChange: jest.fn(),
  placeholder: 'test-input',
};

describe('test Input component', () => {
  it('should render the correct default Input', () => {
    const wrapper = render(<Input {...defaultProps} />);
    const testNode = wrapper.getByPlaceholderText(
      'test-input',
    ) as HTMLInputElement;
    expect(testNode).toBeInTheDocument();
    expect(testNode).toHaveClass('ae-input-body');
    fireEvent.change(testNode, { target: { value: '23' } });
    expect(defaultProps.onChange).toHaveBeenCalled();
    expect(testNode.value).toBe('23');
  });

  it('should render the disabled Input on disabled property', () => {
    const wrapper = render(<Input disabled placeholder='disabled' />);
    const testNode = wrapper.getByPlaceholderText(
      'disabled',
    ) as HTMLInputElement;
    expect(testNode).toBeInTheDocument();
    expect(testNode.disabled).toBeTruthy();
  });

  it('should render different input size on size property', () => {
    const largeWrapper = render(<Input placeholder='large' size='lg' />);
    const smallWrapper = render(<Input placeholder='small' size='sm' />);
    const largeTestContainer = largeWrapper.container.querySelector(
      '.ae-input-wrapper',
    );
    const smallTestContainer = smallWrapper.container.querySelector(
      '.ae-input-wrapper',
    );
    expect(largeTestContainer).toHaveClass('ae-input-lg');
    expect(smallTestContainer).toHaveClass('ae-input-sm');
  });

  it('should render prepend and append element on prepend/append property', () => {
    const { queryByText, container } = render(
      <Input placeholder='pend' prepend='https://' append='.com' />,
    );
    const testContainer = container.querySelector('.ae-input-wrapper');
    expect(testContainer).toHaveClass(
      'ae-input-group ae-input-group-append ae-input-group-prepend',
    );
    expect(queryByText('https://')).toBeInTheDocument();
    expect(queryByText('.com')).toBeInTheDocument();
  });
});
