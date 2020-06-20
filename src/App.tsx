import React from 'react';
import Button, { ButtonSize, ButtonType } from './components/Button/Button';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <Button>Hello</Button>
        <Button disabled={true}>Disabled Button</Button>
        <Button btnType={ButtonType.Warning}>Warning Button</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
          Large Primary
        </Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>
          Small Danger
        </Button>
        <Button btnType={ButtonType.Link} href='https://www.google.com'>
          Google Link
        </Button>
        <Button btnType={ButtonType.Link} href='https://www.baidu.com' disabled={true}>
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
      </header>
    </div>
  );
}

export default App;
