import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import ChartContainer from '../Charts/ChartContainer';
import {
  createInitialTimeSeriesData,
  createInitialBarChartData,
  simulateTimeSeriesData,
  simulateBarChartData
} from '../../utils/dataSimulator';

const Visualization = () => {
  const [timeSeriesData, setTimeSeriesData] = useState(createInitialTimeSeriesData());
  const [barChartData, setBarChartData] = useState(createInitialBarChartData());

  useEffect(() => {
    // Simulate real-time data updates
    const timeSeriesInterval = setInterval(() => {
      setTimeSeriesData(prevData => {
        const newData = [...prevData];
        newData.shift(); // Remove oldest data point
        newData.push(simulateTimeSeriesData(prevData)); // Add new data point
        return newData;
      });
    }, 5000); // Update every 5 seconds

    const barChartInterval = setInterval(() => {
      setBarChartData(prevData => simulateBarChartData(prevData));
    }, 8000); // Update every 8 seconds

    return () => {
      clearInterval(timeSeriesInterval);
      clearInterval(barChartInterval);
    };
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <ChartContainer 
          title="Revenue Trend" 
          data={timeSeriesData} 
          type="linechart" 
          showValueInfo={true}
          total={timeSeriesData[timeSeriesData.length - 1]?.this_month}
          percentageChange={timeSeriesData[timeSeriesData.length - 1]?.percentage_change}
        />
        <ChartContainer 
          title="Monthly Performance" 
          data={barChartData} 
          type="barchart" 
          showValueInfo={true}
          total={barChartData.reduce((sum, item) => sum + item.value, 0)}
          percentageChange={barChartData[barChartData.length - 1]?.percentage_change}
        />
      </Box>
    </Box>
  );
};

export default Visualization; 