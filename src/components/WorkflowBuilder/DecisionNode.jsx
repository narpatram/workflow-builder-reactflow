import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import {
  Typography,
  TextField,
  Button,
  Stack,
} from '@mui/material';
import { HANDLE_STYLE } from '../../utils/constants';

const DecisionNode = ({ id, data }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [condition, setCondition] = useState(data?.condition || 'revenue > 1000000');

  const handleSave = () => {
    data.condition = condition;
    setIsEditing(false);
  };

  const handleCancel = () => {
    setCondition(data?.condition || 'revenue > 1000000');
    setIsEditing(false);
  };

  return (
    <div style={{ padding: 10 }}>
      <Handle 
        type="target" 
        position={Position.Top}
        style={HANDLE_STYLE}
      />
      
      {isEditing ? (
        <Stack spacing={2}>
          <TextField
            size="small"
            label="Condition"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            fullWidth
            placeholder="e.g., revenue > 1000000"
          />
          
          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <Button
              variant="contained"
              size="small"
              onClick={handleSave}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      ) : (
        <div 
          onClick={() => setIsEditing(true)}
          style={{ 
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography 
            variant="body2" 
            color="textSecondary"
          >
            {condition}
          </Typography>
        </div>
      )}

      <Handle 
        type="source" 
        position={Position.Bottom}
        style={HANDLE_STYLE}
      />
    </div>
  );
};

export default DecisionNode; 