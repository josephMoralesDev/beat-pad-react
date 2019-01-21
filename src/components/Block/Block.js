import React, { Component } from 'react';
import './Block.css';

class Block extends Component {
  constructor(props) {
    super(props);
    this.player = null;
    this.handlePlay = this.handlePlay.bind(this);
  }

  componentDidMount() {
    this.tableInput.focus();
    var player = document.getElementById(this.props.audioId);
    player.load();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      var player = document.getElementById(this.props.audioId);
      player.load();
    }
  }

  handlePlay() {
    var player = document.getElementById(this.props.audioId);

    if (player.ended) {
      player.play();
    }
    else if (!player.ended) {
      player.load();
      player.play();
    }
  }

  render() {
    return (
        <button
          onClick={this.handlePlay}
          className={`block ${this.props.audioSource ? 'audio-loaded' : ''}`}
          ref={(input) => { this.tableInput = input; }}
        >
          {this.props.padName}
          {this.props.audioSource &&
            <audio
              id={this.props.audioId}
              preload='auto'
            >
              <source src={this.props.audioSource} type="audio/mp3" />
            </audio>
          }
        </button>
    );
  }
}

export default Block;
