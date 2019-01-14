import React, { Component } from 'react';
import Block from '../../components/Block/Block';
import './BlockTable.css';
class BlockTable extends Component {

  render() {
    return (
      <div className="grid-container">
        {this.props.pads.map((pad, i) =>
          <Block
            key={i}
            clipIndex={i}
            handlePlay={this.props.handlePlay}
            audioId={pad.clipId}
            audioSource={pad.audioSource}
            padName={pad.padName}
          />
        )}

      </div>
    );
  }
}

export default BlockTable;
