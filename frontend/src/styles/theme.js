import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#702433",
      light:"#a2505c",
      dark:"#40000c",
      contrastText: "#ffffff",
    },
    contrastText: "#ffffff",
    secondary: {
      main: "#335477",
      light: "#6180a6",
      dark: "#002c4b",
      contrastText: "rgba(0,0,0,0.89)",
    },
    background: {
      default: "#f5f7f7",
      paper: "#ffffff",
    },
  },
  root: { flexGrow: 1, fontFamily: "Roboto" },
  page: {
    position: "relative",
    marginTop: 20,
  },
  typography: {
    fontSize: 14,
    fontWeightLight: 200,
    fontWeightRegular: 300,
    htmlFontSize: 16,
    overline: {
        fontSize: [30, "!important"],
    }
  },

});

export default theme;