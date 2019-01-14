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
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);

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

  handleKeyDown(event) {
    let keyArray = ['q','w','e','a','s','d','z','x','c'];

    let index = keyArray.indexOf(event.key);
    if (index >= 0) {
      let audioId = this.state.pads[index].name + '-' + index;
      var player = document.getElementById(audioId);
      if (!player.parentElement.className.includes('active')) {
        player.parentElement.className += " active"
      }

      if (player.ended) {
        player.play();
      }
      else if (!player.ended) {
        player.load();
        player.play();
      }
    }
  }

  handleKeyUp(event) {
    let keyArray = ['q','w','e','a','s','d','z','x','c'];

    let index = keyArray.indexOf(event.key);

    if (index >= 0) {
      let audioId = this.state.pads[index].name + '-' + index;
      var player = document.getElementById(audioId);
      if (player.parentElement.className.includes('active')) {
        player.parentElement.className = player.parentElement.className.replace(' active', '')
      }
    }

  }

  render() {
    return (
      <div
        className="App"
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.handleKeyUp}
      >
        {this.state.pads &&
          <BlockTable pads={this.state.pads}/>
        }
      </div>
    );
  }
}

export default App;
