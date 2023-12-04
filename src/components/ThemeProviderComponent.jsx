import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { useMenu } from "../hooks/UseMenu";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

export default function ThemeProviderComponent({children}){
  const {darkMode} = useMenu()
  return <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
    {children}
  </ThemeProvider>
}