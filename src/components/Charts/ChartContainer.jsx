import React from 'react';
import { Box, Typography, IconButton, Paper } from '@mui/material';
import { HelpOutline, TrendingUp, TrendingDown } from '@mui/icons-material';
import { convertKeyToNumber, formatToIndianNumbering, transformKeys } from '../../utils/helper';
import TrendChart from './TrendChart';
import BarChart from './BarChart';

const ChartContainer = ({ 
  title, 
  data, 
  type, 
  total, 
  percentageChange,
  showValueInfo = false 
}) => {
  const renderChart = () => {
    switch (type) {
      case 'linechart':
        return (
          <TrendChart
            data={data}
            value1Key="this_month"
            value2Key="last_month"
            color1="#2EB76F"
            color2="#DB3500CC"
            title={title}
          />
        );
      case 'barchart':
        return (
          <BarChart
            data={data}
            title={title}
          />
        );
      case 'semipie':
        return (
          <Typography>Semi Pie</Typography>
        );
      default:
        return null;
    }
  };

  const isPositive = percentageChange > 0;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;
  const trendColor = isPositive ? '#2e7d32' : '#d32f2f';

  return (
    <Paper sx={{ 
      flex: 1, 
      minWidth: 0, 
      p: 0.5,
      boxShadow: 'none',
      border: '1px solid #e0e0e0',
      borderRadius: '10px',
      maxWidth: "100%",
      maxHeight: "300px"
    }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 1,
        px: 2,
        pt: 1
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: "100%" }}>
          <Typography variant="subtitle1" sx={{ fontSize: '14px', fontWeight: 500 }}>
            {title}
          </Typography>
          <IconButton size="small" sx={{ p: 0.5 }}>
            <HelpOutline sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ borderBottom: '1px solid #e0e0e0', mb: 1 }} />
      {showValueInfo && (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 1,
          px: 2,
        }}>
          {data && (
            <>
              <Typography sx={{ fontSize: '16px', fontWeight: 600 }}>
                {formatToIndianNumbering(total)}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <TrendIcon sx={{ fontSize: 16, color: trendColor }} />
                  <Typography sx={{ fontSize: '12px', color: trendColor, fontWeight: 500 }}>
                    {percentageChange > 0 ? '+' : ''}{percentageChange?.toFixed(2)}%
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: '10px', color: '#757575' }}>
                  vs last period
                </Typography>
              </Box>
            </>
          )}
        </Box>
      )}
      {renderChart()}
    </Paper>
  );
};

export default ChartContainer; 