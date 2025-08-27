import React from 'react';
import { Handle, Position } from 'reactflow';

const ConditionNode = ({ data }) => {
  return (
    <div style={{
      border: '1px solid #ff8f00',
      padding: '10px',
      borderRadius: '5px',
      background: '#fff9c4',
      width: 150,
    }}>
      <Handle type="target" position={Position.Top} />
      <div>
        <strong>{data.label}</strong>
      </div>
      <Handle type="source" position={Position.Bottom} id="true" style={{ left: '75%' }} />
      <Handle type="source" position={Position.Bottom} id="false" style={{ left: '25%' }} />
    </div>
  );
};

export default ConditionNode;
