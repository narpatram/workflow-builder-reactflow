import dayjs from 'dayjs';

// Generate random number within a range
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate random percentage change
const getRandomPercentage = (baseValue) => {
  const change = getRandomNumber(-20, 20);
  return {
    value: Math.round(baseValue * (1 + change/100)),
    percentage: change
  };
};

// Generate success rate between min and max, ensuring it never exceeds 100%
const getSuccessRate = (min, max) => {
  return Math.min(100, getRandomNumber(min, max));
};

// Get number of days in current month
const getDaysInMonth = () => {
  const now = dayjs();
  return now.daysInMonth();
};

// Simulate time series data
export const simulateTimeSeriesData = (currentData) => {
  const lastDate = currentData.length > 0 
    ? dayjs(currentData[currentData.length - 1].date)
    : dayjs().subtract(6, 'day');
  
  const newDate = lastDate.add(1, 'day');
  const lastValue = currentData.length > 0 
    ? currentData[currentData.length - 1].this_month
    : 7000;
  
  const newValue = getRandomPercentage(lastValue);
  
  return {
    date: newDate.format('YYYY-MM-DD'),
    this_month: newValue.value,
    last_month: Math.round(lastValue * 0.9), // Simulate last month as 90% of current
    percentage_change: newValue.percentage
  };
};

// Simulate bar chart data
export const simulateBarChartData = (currentData) => {
  return currentData.map(item => {
    const method1Success = getSuccessRate(60, 95); // Method 1 success rate between 60-95%
    const method2Success = getSuccessRate(50, 90); // Method 2 success rate between 50-90%
    
    return {
      ...item,
      method1: method1Success,
      method2: method2Success,
      percentage_change: method1Success - method2Success // Difference between methods
    };
  });
};

// Create initial data for current month
export const createInitialTimeSeriesData = () => {
  const data = [];
  const daysInMonth = getDaysInMonth();
  const currentMonth = dayjs().format('YYYY-MM');
  let currentValue = 7000;
  
  for (let day = 1; day <= daysInMonth; day++) {
    const date = dayjs(`${currentMonth}-${day.toString().padStart(2, '0')}`);
    const value = getRandomPercentage(currentValue);
    currentValue = value.value;
    
    data.push({
      date: date.format('YYYY-MM-DD'),
      this_month: value.value,
      last_month: Math.round(value.value * 0.9),
      percentage_change: value.percentage
    });
  }
  
  return data;
};

// Create initial data for last 5 months with method success rates
export const createInitialBarChartData = () => {
  const months = [];
  const currentMonth = dayjs();
  
  // Get last 5 months
  for (let i = 4; i >= 0; i--) {
    months.push(currentMonth.subtract(i, 'month').format('MMM'));
  }
  
  return months.map(month => {
    const method1Success = getSuccessRate(60, 95); // Method 1 success rate between 60-95%
    const method2Success = getSuccessRate(50, 90); // Method 2 success rate between 50-90%
    
    return {
      name: month,
      method1: method1Success,
      method2: method2Success,
      percentage_change: method1Success - method2Success // Difference between methods
    };
  });
};

// Generate revenue data for current month
export const generateRevenueData = () => {
  const daysInMonth = getDaysInMonth();
  const currentMonth = dayjs().format('YYYY-MM');
  const data = [];
  let currentRevenue = 500000; // Starting revenue
  
  for (let day = 1; day <= daysInMonth; day++) {
    const date = dayjs(`${currentMonth}-${day.toString().padStart(2, '0')}`);
    const revenue = getRandomPercentage(currentRevenue);
    currentRevenue = revenue.value;
    
    data.push({
      date: date.format('YYYY-MM-DD'),
      revenue: revenue.value,
      target: Math.round(revenue.value * 1.1), // Target is 10% higher than actual
      percentage_change: revenue.percentage
    });
  }
  
  return data;
};

export const generateDecisionOutcomes = () => {
  const optionA = Math.floor(Math.random() * 40) + 30; // Random value between 30-70
  return {
    optionA,
    optionB: 100 - optionA,
  };
};

export const evaluateCondition = (condition, value) => {
  try {
    // Simple evaluation of conditions like "revenue > 1000000"
    const [metric, operator, threshold] = condition.split(' ');
    const numericThreshold = parseFloat(threshold.replace(/[^0-9.-]+/g, ''));
    
    switch (operator) {
      case '>':
        return value > numericThreshold;
      case '<':
        return value < numericThreshold;
      case '>=':
        return value >= numericThreshold;
      case '<=':
        return value <= numericThreshold;
      case '==':
        return value === numericThreshold;
      default:
        return false;
    }
  } catch (error) {
    console.error('Error evaluating condition:', error);
    return false;
  }
}; 