import React, { useCallback, useState } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  Panel,
  addEdge,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Button, Box, Paper, Typography } from '@mui/material';
import DecisionNode from './DecisionNode';
import CustomEdge from './CustomEdge';

const nodeTypes = {
  decision: DecisionNode,
};

const edgeTypes = {
  custom: CustomEdge,
};

const initialNodes = [
  {
    id: '1',
    type: 'decision',
    position: { x: 100, y: 100 },
    data: { 
      label: 'Start',
      condition: 'revenue > 1000000',
    },
  },
];

const nodeStyle = {
  padding: '10px',
  borderRadius: '8px',
  backgroundColor: '#fff',
  border: '2px solid #478ab2',
  minWidth: '200px',
};

const WorkflowBuilder = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params) => {
      const newEdge = {
        ...params,
        type: 'custom',
        data: { condition: '' },
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  const addDecisionNode = () => {
    const newNode = {
      id: `${nodes.length + 1}`,
      type: 'decision',
      position: { 
        x: Math.random() * 500, 
        y: Math.random() * 500 
      },
      data: { 
        label: 'New Decision',
        condition: 'revenue > 1000000',
      },
    };

    setNodes((nds) => [...nds, newNode]);
  };

  return (
    <div style={{ width: '100%', height: '600px' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
      >
        <Background />
        <Controls />
        <Panel position="top-right">
          <Button 
            variant="contained" 
            onClick={addDecisionNode}
            sx={{ mb: 1 }}
          >
            Add Decision Point
          </Button>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default WorkflowBuilder; 