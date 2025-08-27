import React from 'react';
import { conditions } from '../data/conditions';
import { actions } from '../data/actions';

const allConditions = [...conditions.job];
const allActions = [...actions.job];

const ConfigurationPanel = ({ selectedNode, updateNodeData }) => {
  if (!selectedNode) {
    return null;
  }

  const { type, data } = selectedNode;
  const sourceData = type === 'condition' ? allConditions : allActions;
  const nodeMetaData = sourceData.find((item) => item.id === data.id);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    updateNodeData(selectedNode.id, { [name]: value });
  };

  return (
    <aside style={{ width: '300px', borderLeft: '1px solid #ddd', padding: '10px', background: '#f7f7f7' }}>
      <h3>Configuration</h3>
      <p><strong>Node:</strong> {data.label}</p>
      {nodeMetaData && nodeMetaData.inputs.map((input) => (
        <div key={input.name} style={{ marginTop: '10px' }}>
          <label>{input.label || input.name}</label>
          <br />
          {input.type === 'dropdown' ? (
            <select
              name={input.name}
              value={data[input.name] || ''}
              onChange={handleInputChange}
              style={{ width: '100%' }}
            >
              {input.options.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          ) : input.type === 'textarea' ? (
            <textarea
              name={input.name}
              value={data[input.name] || ''}
              onChange={handleInputChange}
              style={{ width: 'calc(100% - 10px)', minHeight: '80px' }}
            />
          ) : (
            <input
              type={input.type}
              name={input.name}
              value={data[input.name] || ''}
              onChange={handleInputChange}
              style={{ width: 'calc(100% - 10px)' }}
            />
          )}
        </div>
      ))}
    </aside>
  );
};

export default ConfigurationPanel;
