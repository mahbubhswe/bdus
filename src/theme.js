import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#202124",
    },
    secondary: {
      main: "#19857b",
    },
    customColor: {
      main: "#EE1B24",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
