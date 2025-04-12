import React from 'react';
import ReactFlow, { Background, Controls, Panel } from 'reactflow';
import 'reactflow/dist/style.css';
import { Button } from '@mui/material';
import DecisionNode from './DecisionNode';
import CustomEdge from './CustomEdge';
import { NODE_TYPES, EDGE_TYPES } from '../../utils/constants';
import { useWorkflow } from '../../hooks/useWorkflow';

const nodeTypes = {
  [NODE_TYPES.DECISION]: DecisionNode,
};

const edgeTypes = {
  [EDGE_TYPES.CUSTOM]: CustomEdge,
};

const WorkflowBuilder = () => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addDecisionNode,
  } = useWorkflow();

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