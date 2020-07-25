import React, { useState } from 'react';

import Transition from './Transition';

import Button from '../Button/Button';

export const DefaultTransition = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <Button size='lg' onClick={() => setShow(!show)}>
        toggle
      </Button>
      <Transition
        in={show}
        timeout={300}
        animation='zoom-in-left'
        data-testid='test'
      >
        <div>
          <p>
            Edit <code>src/App.tsx</code> and save to reload
          </p>
          <p>
            Edit <code>src/App.tsx</code> and save to reload
          </p>
          <p>
            Edit <code>src/App.tsx</code> and save to reload
          </p>
          <p>
            Edit <code>src/App.tsx</code> and save to reload
          </p>
          <p>
            Edit <code>src/App.tsx</code> and save to reload
          </p>
        </div>
      </Transition>
    </>
  );
};

DefaultTransition.storyName = 'Transition';

export const WrappedTransition = () => {
  const [show, setShow] = useState(false);
  return (
    <>
     <Button size='lg' onClick={() => setShow(!show)}>
        toggle
      </Button>
    <Transition in={show} timeout={300} animation='zoom-in-left' wrapper>
      <Button btnType='primary' size='lg'>
        Large Button
      </Button>
    </Transition>
    </>
  );
};

WrappedTransition.storyName = '包裹的Transition'

export default {
  title: 'Transition',
  component: Transition,
};
