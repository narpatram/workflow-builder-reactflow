import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Helvetica',
      'Arial',
      'sans-serif'
    ].join(','),
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: '0.875rem',
          fontWeight: 500,
        },
        secondary: {
          fontSize: '0.75rem',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#478ab2', // Custom primary color
      light: '#6ba3c4',
      dark: '#32719f',
      contrastText: '#ffffff',
    },
  },
});

export default theme; 