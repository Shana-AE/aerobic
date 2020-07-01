import React from 'react';
import { render, RenderResult, fireEvent } from '@testing-library/react';

import Tab, { TabProps } from './Tab';
import TabItem from './TabItem';

const testProps: TabProps = {
  defaultIndex: 0,
  onSelect: jest.fn(),
  className: 'test',
};

const generateTab = (props: TabProps) => {
  return (
    <Tab {...props}>
      <TabItem label='card1'>active</TabItem>
      <TabItem label='disabled' disabled>disabled card</TabItem>
      <TabItem label='card3'>card3 content</TabItem>
    </Tab>
  );
};

let wrapper: RenderResult,
  tabElement: HTMLElement,
  tabNavWrapper: HTMLElement,
  tabContentWrapper: HTMLElement,
  activeNav: HTMLElement,
  activePanel: HTMLElement,
  disabledNav: HTMLElement;

describe('test Tab and TabItem components', () => {
  beforeEach(() => {
    wrapper = render(generateTab(testProps));
    tabElement = wrapper.getByTestId('test-tab');
    tabNavWrapper = wrapper.getByTestId('test-tab-nav');
    tabContentWrapper = wrapper.getByTestId('test-tab-content');
    activePanel = wrapper.getByText('active');
    activeNav = wrapper.getByText('card1');
    disabledNav = wrapper.getByText('disabled');
  });

  it('should render correct Tab and TabItem based on default props', () => {
    expect(tabElement).toBeInTheDocument();
    expect(tabElement).toHaveClass('ae-tab ae-tab-line test');
    expect(tabElement.childElementCount).toEqual(2);
    expect(tabNavWrapper.childElementCount).toEqual(3);
    expect(tabContentWrapper.childElementCount).toEqual(1);
    // pseudo element test
    /*
    // I can't do the test cause getComputedStyle has only one args
    console.log(getComputedStyle.toString());
    console.log(getComputedStyle(tabElement.children[0], '::before'));
    expect(getComputedStyle(tabElement.children[0], '::before').content).toEqual('');
    expect(getComputedStyle(tabElement.children[0], '::before').zIndex).toEqual('-1');
    */
    expect(activeNav).toHaveClass('ae-tab-item active');
    activeNav.parentElement?.childNodes.forEach((sibling) => {
      if (sibling !== activeNav) {
        expect(sibling).not.toHaveClass('active');
      }
    });
    expect(disabledNav).toHaveClass('ae-tab-item disabled');
    expect(activePanel).toBeInTheDocument();
  });

  it('click tabs should change active and call the right callback', () => {
    const thirdNav = wrapper.getByText('card3');
    fireEvent.click(thirdNav);
    const thirdContent = wrapper.getByText('card3 content');
    expect(thirdNav).toHaveClass('active');
    expect(activeNav).not.toHaveClass('active');
    expect(testProps.onSelect).toHaveBeenCalledWith(2);
    expect(activePanel).not.toBeInTheDocument();
    expect(thirdContent).toBeInTheDocument();
    fireEvent.click(disabledNav);
    expect(disabledNav).not.toHaveClass('active');
    expect(tabContentWrapper.children[0].textContent).toBe('card3 content');
  });
});
