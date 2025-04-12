import React from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

const BarChart = ({ 
  data = [], 
  title, 
  height = 200,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  console.log('BarChart data:', data); // Debug log

  return (
    <div style={{ width: '100%', height: height }}>
      {data?.length > 0 ? (
        <ResponsiveContainer>
          <RechartsBarChart 
            data={data} 
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid horizontal={true} vertical={false} stroke='#e0e0e0'/>
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: isMobile ? 10 : 12 }}
              padding={{ left: 0, right: 0 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: isMobile ? 10 : 12 }}
              width={30}
              domain={[0, 100]}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: isMobile ? '10px' : '12px'
              }}
              formatter={(value) => `${value}%`}
            />
            <Legend 
              align="left"
              verticalAlign="bottom"
              iconType="circle"
              iconSize={6}
              wrapperStyle={{ 
                paddingLeft: '10px', 
                paddingBottom: '20px',
                fontSize: isMobile ? '10px' : '12px',
                paddingTop: '10px',
                borderTop:'1px solid #ccc',
                width:"100%"
              }}
            />
            <Bar 
              name="Method 1"
              dataKey="method1" 
              fill="#2EB76F"
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              name="Method 2"
              dataKey="method2" 
              fill="#DB3500CC"
              fillOpacity={0.2}
              radius={[4, 4, 0, 0]}
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      ) : (
        <Skeleton variant="rectangular" width="100%" height="100%" />
      )}
    </div>
  );
};

export default BarChart; 