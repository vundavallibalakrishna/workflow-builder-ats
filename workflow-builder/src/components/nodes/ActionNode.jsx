import React from 'react';
import { Handle, Position } from 'reactflow';

const ActionNode = ({ data }) => {
  return (
    <div style={{
      border: '1px solid #0288d1',
      padding: '10px',
      borderRadius: '5px',
      background: '#b3e5fc',
      width: 150,
    }}>
      <Handle type="target" position={Position.Top} />
      <div>
        <strong>{data.label}</strong>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default ActionNode;
