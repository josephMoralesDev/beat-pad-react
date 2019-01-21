import React, { Component } from 'react';
import config from './config.js';
import BlockTable from './views/BlockTable/BlockTable';
import BeatToggle from './components/BeatToggle/index';
import firebase from 'firebase';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pads: [],
      padList: [],
      selectedPad: 0,
    }
    firebase.initializeApp(config);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleToggleKits = this.handleToggleKits.bind(this)
    this.handleFetchKit = this.handleFetchKit.bind(this);
  }

  componentDidMount() {
    firebase.database().ref('/kit-list').once('value').then((snapshot) => {
      var kits = snapshot.val();

      const newKits = [];

      for (const key in kits) {
        newKits.push(key);
      }

      this.setState({ padList: newKits }, () => {
        this.handleFetchKit(this.state.padList[0]);
      });
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

  handleFetchKit(kit) {
    firebase.database().ref(`/kits/${kit}`).once('value').then((snapshot) => {
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

  handleToggleKits(direction) {
    if (direction === 'right' && this.state.selectedPad < this.state.padList.length - 1) {
      this.setState({selectedPad: this.state.selectedPad + 1}, () => {
        this.handleFetchKit(this.state.padList[this.state.selectedPad]);
      });
    }
    else if (direction === 'left' && this.state.selectedPad > 0) {
      this.setState({selectedPad: this.state.selectedPad - 1}, () => {
        this.handleFetchKit(this.state.padList[this.state.selectedPad]);
      });
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
        <BeatToggle
          changeKit={this.handleToggleKits}
          label={this.state.padList[this.state.selectedPad]}
        />
      </div>
    );
  }
}

export default App;
