import React from 'react';

const Controls = ({ onSave, onLoad, onNew }) => {
  return (
    <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 4 }}>
      <button onClick={onNew} style={{ marginRight: '5px' }}>New Workflow</button>
      <button onClick={onSave} style={{ marginRight: '5px' }}>Save</button>
      <button onClick={onLoad}>Load</button>
    </div>
  );
};

export default Controls;
