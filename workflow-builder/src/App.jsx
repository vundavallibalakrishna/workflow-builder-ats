import React, { useState, useCallback, useRef } from 'react';
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  useReactFlow,
} from 'reactflow';
import Sidebar from './components/Sidebar';
import ConfigurationPanel from './components/ConfigurationPanel';
import Controls from './components/Controls';
import NewWorkflowModal from './components/NewWorkflowModal';
import { entities } from './data/entities';
import { events } from './data/events';
import ConditionNode from './components/nodes/ConditionNode';
import ActionNode from './components/nodes/ActionNode';
import './App.css';

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Start Event' },
    position: { x: 250, y: 5 },
  },
];

const nodeTypes = {
  condition: ConditionNode,
  action: ActionNode,
};

let id = 2;
const getId = () => `${id++}`;

const flowKey = 'workflow-builder-flow';

const Flow = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onSelectionChange,
  setNodes,
  setEdges,
  onNew,
}) => {
  const { setViewport, screenToFlowPosition } = useReactFlow();

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const nodeDataString = event.dataTransfer.getData('application/reactflow');
      if (!nodeDataString) return;

      const { type, id: nodeId, label } = JSON.parse(nodeDataString);
      const position = screenToFlowPosition({ x: event.clientX, y: event.clientY });
      const newNode = { id: getId(), type, position, data: { id: nodeId, label } };
      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, setNodes]
  );

  const onSave = useCallback(() => {
    const flow = { nodes, edges, viewport: { x: 0, y: 0, zoom: 1 } };
    localStorage.setItem(flowKey, JSON.stringify(flow));
    alert('Workflow saved!');
  }, [nodes, edges]);

  const onRestore = useCallback(() => {
    const flow = JSON.parse(localStorage.getItem(flowKey));
    if (flow) {
      const { x = 0, y = 0, zoom = 1 } = flow.viewport;
      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);
      setViewport({ x, y, zoom });
    }
  }, [setNodes, setEdges, setViewport]);

  return (
    <main className="main-content" onDragOver={onDragOver} onDrop={onDrop}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onSelectionChange={onSelectionChange}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls onSave={onSave} onLoad={onRestore} onNew={onNew} />
      </ReactFlow>
    </main>
  );
};

const App = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNewWorkflow = (entityId, eventId) => {
    const entity = entities.find(e => e.id === entityId);
    const event = events[entityId].find(e => e.id === eventId);

    if (!entity || !event) return;

    const newStartNode = {
      id: 'start_node',
      type: 'input',
      data: { label: `On ${entity.name}: ${event.name}` },
      position: { x: 250, y: 50 },
      deletable: false,
      draggable: false,
    };

    setNodes([newStartNode]);
    setEdges([]);
    setSelectedNode(null);
    setIsModalOpen(false);
  };

  const onSelectionChange = useCallback(({ nodes }) => {
    setSelectedNode(nodes.length === 1 ? nodes[0] : null);
  }, []);

  const updateNodeData = (nodeId, newData) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return { ...node, data: { ...node.data, ...newData } };
        }
        return node;
      })
    );
  };

  const onConnect = useCallback(
    (params) => {
      const { source, target } = params;
      const sourceNode = nodes.find((node) => node.id === source);
      const targetNode = nodes.find((node) => node.id === target);

      if (!sourceNode || !targetNode) return;
      const sourceType = sourceNode.type;
      const targetType = targetNode.type;

      const isValidConnection = () => {
        if (source === target) return false;
        if (sourceType === 'input') return targetType === 'condition' || targetType === 'action';
        if (sourceType === 'condition' || sourceType === 'action') return targetType === 'condition' || targetType === 'action';
        return false;
      };

      if (isValidConnection()) {
        setEdges((eds) => addEdge(params, eds));
      }
    },
    [nodes, setEdges],
  );

  return (
    <div className="app-container">
      <ReactFlowProvider>
        <Sidebar />
        <Flow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onSelectionChange={onSelectionChange}
          setNodes={setNodes}
          setEdges={setEdges}
          onNew={() => setIsModalOpen(true)}
        />
        <ConfigurationPanel selectedNode={selectedNode} updateNodeData={updateNodeData} />
        <NewWorkflowModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreate={handleNewWorkflow}
        />
      </ReactFlowProvider>
    </div>
  );
};

export default App;
