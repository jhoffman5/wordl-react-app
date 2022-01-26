import logo from './logo.svg';
import './App.css';
import { Board } from './components/Board';
import { Scripts } from './components/Scripts';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    fetch()
  })

  return (
    <div className="App">
      <Scripts/>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Board/>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
