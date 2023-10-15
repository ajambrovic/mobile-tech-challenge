import { Dimensions } from 'react-native';

export const SCREEN_WIDTH = Dimensions.get('screen').width;

const theme = {
  palette: {
    primary: {
      main: '#FF5500',
      light: '#FD6E35',
      dark: '#CC4400',
    },
    secondary: {
      main: '#FF5500',
      light: '#FD6E35',
      dark: '#CC4400',
    },
    attention: {
      main: '#D64242',
      light: '#F04A4A',
      dark: 'BD3A3A',
    },
    background: {
      body: '#161616',
      base: '#1F1F1F',
      alt1: '#303030',
      alt2: '#484848',
    },
    text: {
      primary: '#FFF',
    },
  },
  spacing: (multiplier = 1) => `${4 * multiplier}px`,
  borderRadius: 4,
  contentPadding: 4,
  typography: {
    h1: {
      'font-weight': 'bold',
      'font-size': SCREEN_WIDTH / 6,
    },
    h2: {
      'font-weight': 'bold',
      'font-size': SCREEN_WIDTH / 8,
    },
    h3: {
      'font-weight': 'bold',
      'font-size': SCREEN_WIDTH / 10,
    },
    h4: {
      'font-weight': 'bold',
      'font-size': SCREEN_WIDTH / 14,
    },
    h5: {
      'font-weight': 'bold',
      'font-size': SCREEN_WIDTH / 18,
    },
    h6: {
      'font-weight': 'bold',
      'font-size': SCREEN_WIDTH / 25,
    },
    body: {
      'font-weight': 'normal',
      'font-size': SCREEN_WIDTH / 27,
    },
    button: {
      'font-weight': 'bold',
      'font-size': SCREEN_WIDTH / 27,
      'text-transform': 'uppercase',
    },
  },
  breakpoints: {
    s: '480px',
    m: '768px',
    l: '992px',
    xl: '1200px',
    xxl: '1620px',
  },
};

export default theme;
