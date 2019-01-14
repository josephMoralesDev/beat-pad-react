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
            audioId={`${pad.name}-${i}`}
            audioSource={pad.sound}
            padName={pad.name}
          />
        )}

      </div>
    );
  }
}

export default BlockTable;
