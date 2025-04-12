import { useCallback } from 'react';
import { useNodesState, useEdgesState, addEdge } from 'reactflow';
import { INITIAL_NODES } from '../utils/constants';

export const useWorkflow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES);
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

  const addDecisionNode = useCallback(() => {
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
  }, [nodes.length, setNodes]);

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addDecisionNode,
  };
}; 