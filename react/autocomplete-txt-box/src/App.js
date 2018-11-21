import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HideableText from './HideableText'
import AutoCompleteText from './AutoCompleteText';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <div className="SearchBox">
            <HideableText text="Dynamic Text!" />
            <AutoCompleteText />
          </div>
        </header>
      </div>
    );
  }
}

export default App;
