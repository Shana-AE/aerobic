import React from 'react';
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
  waitFor,
} from '@testing-library/react';

import Menu, { MenuProps } from './Menu';
import MenuItem from './MenuItem';
import SubMenu from './SubMenu';

const testProps: MenuProps = {
  defaultIndex: '0',
  onSelect: jest.fn(),
  className: 'test',
};

const testVerticalProps: MenuProps = {
  defaultIndex: '0',
  mode: 'vertical',
};

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>xyz</MenuItem>
      <SubMenu title='dropdown'>
        <MenuItem>drop1</MenuItem>
      </SubMenu>
    </Menu>
  );
};

const createStyleFile = () => {
  const cssFile: string = `
    .ae-submenu {
      display: none;
    }
    .ae-submenu.ae-menu-opened {
      display: block;
    }
  `;

  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = cssFile;
  return style;
};

let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement;
describe('test Menu and MenuItem components', () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps));
    wrapper.container.append(createStyleFile());
    menuElement = wrapper.getByTestId('test-menu');
    activeElement = wrapper.getByText('active');
    disabledElement = wrapper.getByText('disabled');
  });
  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass('ae-menu test');
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4);
    expect(activeElement).toHaveClass('ae-menu-item active');
    expect(disabledElement).toHaveClass('ae-menu-item disabled');
  });

  it('click items should change active adn call the right callback', () => {
    const thirdItem = wrapper.getByText('xyz');
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass('active');
    expect(activeElement).not.toHaveClass('active');
    expect(testProps.onSelect).toHaveBeenCalledWith('2');
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass('active');
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1');
  });

  it('should render vertical mode when mode is set to vertical', () => {
    cleanup();
    const wrapper = render(generateMenu(testVerticalProps));
    const menuElement = wrapper.getByTestId('test-menu');
    expect(menuElement).toHaveClass('ae-menu-vertical');
  });

  it('should show dropdown items when hover on subMenu', async () => {
    expect(wrapper.queryByText('drop1')).not.toBeVisible();
    const dropdownElement = wrapper.getByText('dropdown');
    fireEvent.mouseEnter(dropdownElement);
    // assert wouldn't wait for async operation
    await waitFor(() => {
      expect(wrapper.queryByText('drop1')).toBeVisible();
    });
    fireEvent.click(wrapper.getByText('drop1'));
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0');
    fireEvent.mouseLeave(dropdownElement);
    await waitFor(() => {
      expect(wrapper.queryByText('drop1')).not.toBeVisible();
    });
  });

  it('should show dropdown items when hover on vertical subMenu', async () => {
    cleanup();
    const wrapper = render(generateMenu(testVerticalProps));
    wrapper.container.append(createStyleFile());
    expect(wrapper.queryByText('drop1')).not.toBeVisible();
    const dropdownElement = wrapper.getByText('dropdown');
    fireEvent.click(dropdownElement);
    expect(wrapper.queryByText('drop1')).toBeVisible();
    fireEvent.click(wrapper.getByText('drop1'));
    expect(testProps.onSelect).toHaveBeenCalledWith('3-0');
    fireEvent.click(dropdownElement);
    expect(wrapper.queryByText('drop1')).not.toBeVisible();
  });
});
