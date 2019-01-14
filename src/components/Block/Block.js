import React, { Component } from 'react';
import './Block.css';

class Block extends Component {
  constructor(props) {
    super(props);
    this.player = null;
    this.handlePlay = this.handlePlay.bind(this);
  }

  componentDidMount() {
    var player = document.getElementById(this.props.audioId);
    player.load();
  }

  componentDidUpdate(prevProps) {
    var player = document.getElementById(this.props.audioId);
    // Typical usage (don't forget to compare props):
      if (player) {
        player.play();
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
        >
          {this.props.padName}
          {this.props.audioSource &&
            <audio
              id={this.props.audioId}
            >
              <source src={this.props.audioSource} type="audio/mp3" />
            </audio>
          }
        </button>
    );
  }
}

export default Block;
