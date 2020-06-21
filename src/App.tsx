import React from 'react';
import Button, { ButtonSize, ButtonType } from './components/Button/Button';
import Alert, { AlertType } from './components/Alert/Alert';

function App() {
  return (
    <div className='App'>
      <section>
        <h1>Button Area</h1>
        <Button className='custom'>Hello</Button>
        <Button disabled>Disabled Button</Button>
        <Button btnType={ButtonType.Warning}>Warning Button</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
          Large Primary
        </Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>
          Small Danger
        </Button>
        <Button btnType={ButtonType.Link} href='https://www.google.com' target='_blank'>
          Google Link
        </Button>
        <Button btnType={ButtonType.Link} href='https://www.baidu.com' disabled>
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
        <Alert type={AlertType.Primary} closable>Primary Alert</Alert>
        <Alert type={AlertType.Success}>Success Alert</Alert>
        <Alert type={AlertType.Warning}>Warning Alert</Alert>
        <Alert type={AlertType.Danger}>Danger Alert</Alert>
        <Alert message='Alert message' description='Alert Description' />
        <Alert message='closable Alert message' description='closable Alert Description' closable/>
      </section>
    </div>
  );
}

export default App;