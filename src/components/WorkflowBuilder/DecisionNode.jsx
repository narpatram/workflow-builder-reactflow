import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
} from '@mui/material';

const DecisionNode = ({ id, data }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [condition, setCondition] = useState(data?.condition || 'revenue > 1000000');

  const handleSave = () => {
    data.condition = condition;
    setIsEditing(false);
  };

  return (
    <div style={{ padding: 10 }}>

        <Handle 
          type="target" 
          position={Position.Top}
          style={{ 
            background: '#1976d2',
            width: 10,
            height: 10,
          }}
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
                onClick={() => setIsEditing(false)}
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
          style={{ 
            background: '#1976d2',
            width: 10,
            height: 10,
          }}
        />
    </div>
  );
};

export default DecisionNode; 