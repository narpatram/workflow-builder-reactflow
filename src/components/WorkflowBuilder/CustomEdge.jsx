import React, { useState } from 'react';
import { BaseEdge, EdgeLabelRenderer, getBezierPath } from 'reactflow';
import { Paper, Typography, IconButton, TextField, Button, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  style = {},
  markerEnd,
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [condition, setCondition] = useState(data?.condition || '');

  const handleSave = () => {
    data.condition = condition;
    setIsEditing(false);
  };

  const getEdgeStyle = () => {
    if (!data?.condition) return style;
    
    try {
      // Mock data for demonstration
      const mockData = {
        revenue: 1500000,
        profit: 500000,
        growth: 0.15
      };
      
      // Simple condition evaluation
      const parts = condition.split(' ');
      if (parts.length !== 3) return style;
      
      const [metric, operator, value] = parts;
      if (!metric || !operator || !value) return style;
      
      const numericValue = parseFloat(value.replace(/[^0-9.-]+/g, ''));
      const metricValue = mockData[metric];
      
      if (isNaN(numericValue) || metricValue === undefined) return style;
      
      let isActive = false;
      switch (operator) {
        case '>':
          isActive = metricValue > numericValue;
          break;
        case '<':
          isActive = metricValue < numericValue;
          break;
        case '>=':
          isActive = metricValue >= numericValue;
          break;
        case '<=':
          isActive = metricValue <= numericValue;
          break;
        case '==':
          isActive = metricValue === numericValue;
          break;
        default:
          return style;
      }
      
      return {
        ...style,
        stroke: isActive ? '#2e7d32' : '#d32f2f',
        strokeWidth: 2,
      };
    } catch (error) {
      console.error('Error evaluating condition:', error);
      return style;
    }
  };

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={getEdgeStyle()} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents: 'all',
          }}
        >
          {isEditing ? (
            <Paper elevation={3} sx={{ p: 2, minWidth: 200 }}>
              <Stack spacing={2}>
                <Typography variant="subtitle2">Set Condition</Typography>
                <TextField
                  size="small"
                  label="Condition"
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  placeholder="e.g., revenue > 1000000"
                  fullWidth
                />
                <Stack direction="row" spacing={1} justifyContent="flex-end">
                  <Button size="small" onClick={handleSave}>
                    Save
                  </Button>
                  <Button size="small" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </Stack>
              </Stack>
            </Paper>
          ) : (
            <Paper 
              elevation={2}
              sx={{ 
                p: 1,
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                cursor: 'pointer',
              }}
              onClick={() => setIsEditing(true)}
            >
              <Typography variant="body2">
                {data?.condition || 'Click to add condition'}
              </Typography>
              <IconButton size="small">
                <EditIcon fontSize="small" />
              </IconButton>
            </Paper>
          )}
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomEdge; 