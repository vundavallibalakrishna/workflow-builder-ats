import React, { useState } from 'react';
import { entities } from '../data/entities';
import { events } from '../data/events';

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    background: 'white',
    padding: '20px',
    borderRadius: '5px',
    width: '400px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  body: {
    marginTop: '20px',
  },
  footer: {
    marginTop: '20px',
    textAlign: 'right',
  },
  select: {
    width: '100%',
    padding: '8px',
    marginTop: '5px',
    marginBottom: '15px',
  },
};

const NewWorkflowModal = ({ isOpen, onClose, onCreate }) => {
  const [selectedEntity, setSelectedEntity] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('');

  if (!isOpen) {
    return null;
  }

  const handleCreate = () => {
    onCreate(selectedEntity, selectedEvent);
  };

  const entityOptions = entities.map(entity => (
    <option key={entity.id} value={entity.id}>{entity.name}</option>
  ));

  const eventOptions = selectedEntity ? events[selectedEntity].map(event => (
    <option key={event.id} value={event.id}>{event.name}</option>
  )) : [];

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.modal}>
        <div style={modalStyles.header}>
          <h3>Create New Workflow</h3>
          <button onClick={onClose}>&times;</button>
        </div>
        <div style={modalStyles.body}>
          <label>Entity</label>
          <select
            style={modalStyles.select}
            value={selectedEntity}
            onChange={(e) => {
              setSelectedEntity(e.target.value);
              setSelectedEvent(''); // Reset event on entity change
            }}
          >
            <option value="">Select an Entity</option>
            {entityOptions}
          </select>

          <label>Event</label>
          <select
            style={modalStyles.select}
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            disabled={!selectedEntity}
          >
            <option value="">Select an Event</option>
            {eventOptions}
          </select>
        </div>
        <div style={modalStyles.footer}>
          <button onClick={onClose} style={{ marginRight: '10px' }}>Cancel</button>
          <button onClick={handleCreate} disabled={!selectedEntity || !selectedEvent}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewWorkflowModal;
