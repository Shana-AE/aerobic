import React from 'react';
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react';

import Menu, { MenuProps } from './Menu';
import MenuItem from './MenuItem';

const testProps: MenuProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: 'test',
};

const testVerticalProps: MenuProps = {
  defaultIndex: 0,
  mode: 'vertical',
};

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem index={0}>active</MenuItem>
      <MenuItem disabled index={1}>
        disabled
      </MenuItem>
      <MenuItem index={2}>xyz</MenuItem>
    </Menu>
  );
};

let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement;
describe('test Menu and MenuItem components', () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps));
    menuElement = wrapper.getByTestId('test-menu');
    activeElement = wrapper.getByText('active');
    disabledElement = wrapper.getByText('disabled');
  });
  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('ae-menu test');
    expect(menuElement.getElementsByTagName('li').length).toEqual(3);
    expect(activeElement).toHaveClass('ae-menu-item active');
    expect(disabledElement).toHaveClass('ae-menu-item disabled');
  });

  it('click items should change active adn call the right callback', () => {
    const thirdItem = wrapper.getByText('xyz');
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass('active');
    expect(activeElement).not.toHaveClass('active');
    expect(testProps.onSelect).toHaveBeenCalledWith(2);
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass('active');
    expect(testProps.onSelect).not.toHaveBeenCalledWith(1);
  });

  it('should render vertical mode when mode is set to vertical', () => {
    cleanup();
    const wrapper = render(generateMenu(testVerticalProps));
    const menuElement = wrapper.getByTestId('test-menu');
    expect(menuElement).toHaveClass('ae-menu-vertical');
  });
});
