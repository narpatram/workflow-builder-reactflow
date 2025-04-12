import React from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import logo from '../../assets/header_logo.png';

const drawerWidth = 240;
const miniDrawerWidth = 80;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: miniDrawerWidth,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: drawerWidth,
    }),
  }),
);

const Layout = ({ children, activeTab, onTabChange }) => {
  const [open, setOpen] = React.useState(true);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>

      <Drawer
        variant="permanent"
        sx={{
          width: open ? drawerWidth : miniDrawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? drawerWidth : miniDrawerWidth,
            boxSizing: 'border-box',
            transition: 'width 0.3s ease',
            overflowX: 'hidden',
          },
        }}
      >
        <IconButton
          color="#478ab2"
          aria-label="open drawer"
          onClick={handleDrawerToggle}
          edge="start"
          sx={{ 
            position: 'fixed',
            zIndex: 1200,
            marginLeft: "15px",
          }}
        >
          <MenuIcon />
        </IconButton>
        

        <List sx={{ marginTop: "40px" }}>
          <ListItem 
            button 
            selected={activeTab === 0} 
            onClick={() => onTabChange(null, 0)}
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <DashboardIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Workflow Builder" />}
          </ListItem>
          <ListItem 
            button 
            selected={activeTab === 1} 
            onClick={() => onTabChange(null, 1)}
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <BarChartIcon />
            </ListItemIcon>
            {open && <ListItemText primary="Visualization" />}
          </ListItem>
        </List>
      </Drawer>

      <Main open={open} sx={{ marginLeft: "0px", marginTop: "0px" }}   >
        {children}
      </Main>
    </Box>
  );
};

export default Layout; 