import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useSelector } from 'react-redux';
import { Paper, Typography, Grid } from '@mui/material';

const Charts = () => {
  const revenueData = useSelector((state) => state.workflow.revenueData);
  const decisionOutcomes = useSelector((state) => state.workflow.decisionOutcomes);

  const outcomeData = [
    { name: 'Option A', value: decisionOutcomes.optionA },
    { name: 'Option B', value: decisionOutcomes.optionB },
  ];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Revenue Over Time
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Decision Outcomes
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={outcomeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Charts; 