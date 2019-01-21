import React from 'react';
import Block from '../../components/Block/Block';
import './BlockTable.css';

const BlockTable = (props) => {
  return (
    <div
      className="grid-container"
    >
      {props.pads.map((pad, i) =>
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
};

export default BlockTable;
