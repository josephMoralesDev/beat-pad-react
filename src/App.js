import React, { Component } from 'react';
import config from './config.js';
import BlockTable from './views/BlockTable/BlockTable';
import firebase from 'firebase';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pads: [],
    }
    firebase.initializeApp(config);
  }

  componentDidMount() {
    return firebase.database().ref('/husky-disko').once('value').then((snapshot) => {
      var kit = snapshot.val();

      const newKit = [];

      for (const key in kit) {
        newKit.push({
          name: key,
          sound: kit[key]
        });
      }

      this.setState({ pads: newKit });
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.pads &&
          <BlockTable pads={this.state.pads}/>
        }
      </div>
    );
  }
}

export default App;
