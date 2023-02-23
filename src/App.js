import logo from './logo.svg';
import './App.css';
import Nav from './navBar/Nav';
import Main from './mainPage/Main';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to <code>reload</code>.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React SIIII
        </a>
      </header>
    </div>
  );
}

export default App;
