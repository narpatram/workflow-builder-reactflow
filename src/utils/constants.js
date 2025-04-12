export const NODE_TYPES = {
  DECISION: 'decision',
};

export const EDGE_TYPES = {
  CUSTOM: 'custom',
};

export const INITIAL_NODES = [
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

export const NODE_STYLE = {
  padding: '10px',
  borderRadius: '8px',
  backgroundColor: '#fff',
  border: '2px solid #478ab2',
  minWidth: '200px',
};

export const HANDLE_STYLE = {
  background: '#1976d2',
  width: 10,
  height: 10,
}; 