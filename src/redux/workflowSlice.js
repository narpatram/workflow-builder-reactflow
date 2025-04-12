import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nodes: [],
  edges: [],
  selectedNode: null,
  rules: {},
  revenueData: [],
  decisionOutcomes: {
    optionA: 60,
    optionB: 40,
  },
};

export const workflowSlice = createSlice({
  name: 'workflow',
  initialState,
  reducers: {
    setNodes: (state, action) => {
      state.nodes = action.payload;
    },
    setEdges: (state, action) => {
      state.edges = action.payload;
    },
    setSelectedNode: (state, action) => {
      state.selectedNode = action.payload;
    },
    addRule: (state, action) => {
      const { edgeId, rule } = action.payload;
      state.rules[edgeId] = rule;
    },
    updateRevenueData: (state, action) => {
      state.revenueData = action.payload;
    },
    updateDecisionOutcomes: (state, action) => {
      state.decisionOutcomes = action.payload;
    },
  },
});

export const {
  setNodes,
  setEdges,
  setSelectedNode,
  addRule,
  updateRevenueData,
  updateDecisionOutcomes,
} = workflowSlice.actions;

export default workflowSlice.reducer; 