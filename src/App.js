import React, { Component } from 'react';
import samplePads from './samplePads.js';
import './App.css';
import BlockTable from './views/BlockTable/BlockTable';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pads: samplePads,
    }

  }

  render() {
    return (
      <div className="App">
        <BlockTable pads={this.state.pads}/>
      </div>
    );
  }
}

export default App;
