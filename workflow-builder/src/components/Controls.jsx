import React from 'react';

const Controls = ({ onSave, onLoad }) => {
  return (
    <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 4 }}>
      <button onClick={onSave} style={{ marginRight: '5px' }}>Save</button>
      <button onClick={onLoad}>Load</button>
    </div>
  );
};

export default Controls;
