import React, { Component } from 'react';
import logo from './images/hud.png';
import './App.css';
import Draggable from './components/dragdrop'

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Draggable>
            <div>
            <img src={logo} style={{ width:"50%" }}/>
            </div>
            <p>
            Command Line Hud
            </p>
          </Draggable>
        </header>
      </div>
    );
  }
}

export default App;
