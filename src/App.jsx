import { Paper, Switch, ThemeProvider, createTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { routes } from "./routes";
import { getFromLS, saveToLS } from "./services";

function App() {
  const [modeTheme, setModeTheme] = useState("dark");

  useEffect(() => {
    setModeTheme(getFromLS("modeTheme"));
  }, []);

  useEffect(() => {
    saveToLS("modeTheme", modeTheme);
  }, [modeTheme]);

  const theme = createTheme({
    typography: {},
    palette: {
      mode: modeTheme,
      // primary: {
      //   main: "#ff0",
      // },
      // text: {
      //   main: "#ff0",
      // },
    },
  });

  const handleThemeChange = () => {
    setModeTheme(modeTheme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeProvider theme={theme}>
      <Paper style={{ width: "100%", minHeight: "100vh" }}>
        <Switch checked={modeTheme === "dark"} onChange={handleThemeChange} />
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} {...route} />
          ))}
        </Routes>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
