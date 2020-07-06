import React, { useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import Button from './components/Button/Button';
import Alert from './components/Alert/Alert';
import Menu from './components/Menu/Menu';
import MenuItem from './components/Menu/MenuItem';
import SubMenu from './components/Menu/SubMenu';
import Tab from './components/Tab/Tab';
import TabItem from './components/Tab/TabItem';
import Icon from './components/Icon/Icon';
import Transition from './components/Transition/Transition';

library.add(fas);

function App() {
  const customTabLabel = <Button btnType='primary'>Button Tab</Button>;
  const [show, setShow] = useState(false);
  return (
    <div className='App'>
      <section>
        <h1>Button Area</h1>
        <Button className='custom'>Hello</Button>
        <Button disabled>Disabled Button</Button>
        <Button btnType='warning'>Warning Button</Button>
        <Button btnType='primary' size='lg'>
          Large Primary
        </Button>
        <Button btnType='danger' size='sm'>
          Small Danger
        </Button>
        <Button btnType='link' href='https://www.google.com' target='_blank'>
          Google Link
        </Button>
        <Button btnType='link' href='https://www.baidu.com' disabled>
          Disabled Link
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </section>
      <section>
        <h1>Alert Area</h1>
        <Alert className='custom'>Default Alert</Alert>
        <Alert type='primary' closable>
          Primary Alert
        </Alert>
        <Alert type='success'>Success Alert</Alert>
        <Alert type='warning'>Warning Alert</Alert>
        <Alert type='danger'>Danger Alert</Alert>
        <Alert message='Alert message' description='Alert Description' />
        <Alert
          message='closable Alert message'
          description='closable Alert Description'
          closable
        />
      </section>
      <section>
        <h1>Menu Area</h1>
        <Menu
          onSelect={(index) => {
            alert(index);
          }}
        >
          <MenuItem>cool link 1</MenuItem>
          <MenuItem disabled>cool link 2</MenuItem>
          <SubMenu title='dropdown'>
            <MenuItem>dropdown 1</MenuItem>
            <MenuItem>dropdown 2</MenuItem>
          </SubMenu>
          <MenuItem>cool link 3</MenuItem>
        </Menu>
        <Menu
          onSelect={(index) => {
            alert(index);
          }}
          mode='vertical'
          defaultOpenSubMenus={['2']}
        >
          <MenuItem>vertical cool link 1</MenuItem>
          <MenuItem disabled>vertical cool link 2</MenuItem>
          <SubMenu title='dropdown'>
            <MenuItem>dropdown 1</MenuItem>
            <MenuItem>dropdown 2</MenuItem>
          </SubMenu>
          <MenuItem>vertical cool link 3</MenuItem>
        </Menu>
      </section>
      <section>
        <h1>Tab Area</h1>
        <Tab
          mode='line'
          onSelect={(index) => {
            alert(index);
          }}
        >
          <TabItem label='card1'>this is content one</TabItem>
          <TabItem label='card2'>this is content two</TabItem>
          <TabItem label={customTabLabel}>this is a custom label</TabItem>
          <TabItem label='card3' disabled>
            this is content three
          </TabItem>
        </Tab>
        <Tab
          mode='box'
          onSelect={(index) => {
            alert(index);
          }}
        >
          <TabItem label='card1'>this is content one</TabItem>
          <TabItem label='card2'>this is content two</TabItem>
          <TabItem label='card3' disabled>
            this is content three
          </TabItem>
        </Tab>
      </section>
      <section>
        <h1>Icon Area</h1>
        <Icon icon='arrow-down' theme='danger' size='10x' />
        <Icon icon='coffee' theme='primary' size='10x' />
      </section>
      <section>
        <h1>Transition Area</h1>
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
        <Transition
          in={show}
          timeout={300}
          animation='zoom-in-left'
          wrapper
        >
          <Button btnType='primary' size='lg'>
            Large Button
          </Button>
        </Transition>
      </section>
    </div>
  );
}

export default App;
