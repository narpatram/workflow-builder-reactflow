import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Layout from './layouts/Layout';
import WorkflowBuilder from './components/WorkflowBuilder/WorkflowBuilder';
import Visualization from './components/Visualization/Visualization';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Tabs, Tab } from '@mui/material';

function NavigationTabs() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <Tabs value={currentPath}>
      <Tab 
        label="Workflow Builder" 
        component={Link} 
        to="/workflow-builder" 
        value="/workflow-builder"
      />
      <Tab 
        label="Analytics Dashboard" 
        component={Link} 
        to="/analytics-dashboard" 
        value="/analytics-dashboard"
      />
    </Tabs>
  );
}

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Layout>
            <NavigationTabs />
            <Routes>
              <Route path="/workflow-builder" element={<WorkflowBuilder />} />
              <Route path="/analytics-dashboard" element={<Visualization />} />
              <Route path="/" element={<WorkflowBuilder />} />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App; 