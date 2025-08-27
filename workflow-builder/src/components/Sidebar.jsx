import React from 'react';
import { conditions } from '../data/conditions';
import { actions } from '../data/actions';

const onDragStart = (event, nodeType, nodeId, label) => {
  const nodeData = JSON.stringify({ type: nodeType, id: nodeId, label });
  event.dataTransfer.setData('application/reactflow', nodeData);
  event.dataTransfer.effectAllowed = 'move';
};

const Sidebar = () => {
  return (
    <aside style={{ width: '250px', borderRight: '1px solid #ddd', padding: '10px', background: '#f7f7f7' }}>
      <h3>Nodes</h3>
      <strong>Events</strong>
      <ul>
        <li onDragStart={(event) => onDragStart(event, 'input', 'start_event', 'Start Event')} draggable>
          Start Event
        </li>
      </ul>
      <strong>Conditions</strong>
      <ul>
        {conditions.job.map((condition) => (
          <li
            key={condition.id}
            onDragStart={(event) => onDragStart(event, 'condition', condition.id, condition.name)}
            draggable
          >
            {condition.name}
          </li>
        ))}
      </ul>
      <strong>Actions</strong>
      <ul>
        {actions.job.map((action) => (
          <li
            key={action.id}
            onDragStart={(event) => onDragStart(event, 'action', action.id, action.name)}
            draggable
          >
            {action.name}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
