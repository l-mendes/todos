import { createMuiTheme } from '@material-ui/core/styles';
import { colors } from '@material-ui/core';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      light: colors.purple[300],
      main: colors.purple[800],
      dark: colors.purple[900],
    },
    error: {
      main: colors.red.A400,
    },
    background: {
      default: colors.common.white,
      dark: colors.grey[100],
      papper: colors.common.white,
    },
  },
});

export default theme;
