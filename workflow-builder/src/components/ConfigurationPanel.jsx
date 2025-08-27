import React from 'react';
import { conditions } from '../data/conditions';
import { actions } from '../data/actions';
import { autocompleteData } from '../data/autocomplete';
import Autocomplete from './Autocomplete';

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
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
    updateNodeData(selectedNode.id, { [name]: newValue });
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
          ) : input.type === 'flag' ? (
            <input
              type="checkbox"
              name={input.name}
              checked={!!data[input.name]}
              onChange={handleInputChange}
            />
          ) : input.type === 'autocomplete' ? (
            <Autocomplete
              name={input.name}
              value={data[input.name]}
              onChange={handleInputChange}
              suggestions={autocompleteData[input.autocomplete_type] || []}
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
      {nodeMetaData && nodeMetaData.inputs.some(input => input.type === 'autocomplete') && (
        <style>{`
          .suggestions {
            border: 1px solid #999;
            border-top-width: 0;
            list-style: none;
            margin-top: 0;
            max-height: 143px;
            overflow-y: auto;
            padding-left: 0;
            width: calc(100% - 20px);
            position: absolute;
            background-color: white;
            z-index: 5;
          }
          .suggestions li {
            padding: 0.5rem;
          }
          .suggestions li:hover {
            background-color: #f0f0f0;
            cursor: pointer;
          }
          .no-suggestions {
            color: #999;
            padding: 0.5rem;
          }
        `}</style>
      )}
    </aside>
  );
};

export default ConfigurationPanel;
