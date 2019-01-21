import React from 'react';

const BeatToggle = (props) => {
  return (
    <div>
      <button onClick={() => props.changeKit('left')}> left </button>
        <span> {props.label} </span>
      <button onClick={() => props.changeKit('right')}> right </button>
    </div>
  );
};

export default BeatToggle;
