import React from 'react';
import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import Skeleton from '@mui/material/Skeleton'
import { convertKeyToNumber, formatToIndianNumbering } from '../../utils/helper';
import dayjs from 'dayjs';


const AreaChart = ({ data, title, value1Key, value2Key, color1, color2 }) => {
  console.log(value1Key, title, data)
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toPascalCase = (str) => {
    return str
      .split('_')
      .map((word, index) => 
        index === 0 ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join(' ');
  };

  console.log(data)
  console.log(dayjs('2025-04-10').date().toString())

  return (
    <div style={{ width: '100%', height: 200 }}>
    {
      data?.length > 0 ? (<ResponsiveContainer >
        <RechartsAreaChart data={convertKeyToNumber(data, value1Key )} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`color${value1Key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color1} stopOpacity={0.2}/>
              <stop offset="95%" stopColor={color1} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid  horizontal={true} vertical={false} stroke='#e0e0e0'/>
          <XAxis 
            dataKey="date" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: isMobile ? 10 : 12 }}
            padding={{ left: 0, right: 0 }}
            tickFormatter={(value) => dayjs(value).date().toString()}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            domain={[1, 10]}
            tick={{ fontSize: isMobile ? 10 : 12 }}
            width={30}
            tickFormatter={(value) => formatToIndianNumbering(value)}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: isMobile ? '10px' : '12px'
            }}
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
            formatter={(value) => toPascalCase(value)}
          />
          <Area type="monotone" dataKey={value1Key} stroke={color1} fillOpacity={1} fill={`url(#color${value1Key})`} />
          <Area type="monotone" dataKey={value2Key} stroke={color2} strokeDasharray="5 5" fillOpacity={0} />
        </RechartsAreaChart>
      </ResponsiveContainer>) : <Skeleton variant="rectangular" width="100%" height="100%" />
    }
      
    </div>
  );
};

export default AreaChart; 