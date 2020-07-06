import React, { useState } from 'react';
import { render, RenderResult, fireEvent, waitFor } from '@testing-library/react';

import Transition, { TransitionProps } from './Transition';
import Button from '../Button/Button';

const testProps: TransitionProps = {
  animation: 'zoom-in-top',
  timeout: 300,
};

const TestTransition:React.FC<TransitionProps> = (props: TransitionProps) => {
  const [show, setShow] = useState(false);
  return (
    <>
    <Button
      size='sm'
      onClick={() => setShow(!show)}
      {...props}
      data-testid='toggle-button'
    >
      toggle
    </Button>
    <Transition
      in={show}
      {...testProps}
      wrapper
      data-testid='transition'
    >
      <Button
        size='lg'
        btnType='primary'
        data-testid='large-button'
      >
        Large Button
      </Button>
    </Transition>
    </>
  );
};

let wrapper: RenderResult,
  toggleBtn: HTMLButtonElement,
  transitionElement: HTMLElement | null,
  largeBtnElement: HTMLButtonElement | null;

describe('test Transition component', () => {
  beforeEach(() => {
    wrapper = render(<TestTransition {...testProps}/>)
    toggleBtn = wrapper.getByTestId('toggle-button') as HTMLButtonElement;
    transitionElement = wrapper.queryByTestId('transition');
    largeBtnElement = wrapper.queryByTestId('large-button') as HTMLButtonElement | null;
  });

  it('Button in transition should behave right', () => {
    expect(toggleBtn).toBeInTheDocument();
    expect(largeBtnElement).toBeNull();
    expect(transitionElement).toBeNull();
    fireEvent.click(toggleBtn);
    largeBtnElement = wrapper.queryByTestId('large-button') as HTMLButtonElement | null;
    transitionElement = wrapper.queryByTestId('transition');
    waitFor(() => {
      expect(transitionElement).toHaveClass('zoom-in-top-enter-active');
      expect(transitionElement).toHaveClass('zoom-in-top-enter');
      expect(transitionElement).toHaveClass('zoom-in-top-enter-done');
      expect(largeBtnElement).toBeInTheDocument();
    });
    fireEvent.click(toggleBtn);
    waitFor(() => {
      expect(transitionElement).toHaveClass('zoom-in-top-exit');
      expect(transitionElement).toHaveClass('zoom-in-top-exit-active');
      expect(transitionElement).toHaveClass('zoom-in-top-exit-done');
      largeBtnElement = wrapper.queryByTestId('large-button') as HTMLButtonElement | null;
      transitionElement = wrapper.queryByTestId('transition');
      expect(largeBtnElement).toBeNull();
      expect(transitionElement).toBeNull();
    });
  });
})