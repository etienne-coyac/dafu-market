import { Box, CssVarsProvider } from "@mui/joy";
import Header from "./components/layout/Header";
import { Outlet } from "react-router";
import customTheme from "./theme";

function App() {
  return (
    <CssVarsProvider theme={customTheme}>
      <Header />
      <Box component={"main"} sx={{ p: 1 }}>
        <Outlet />
      </Box>
    </CssVarsProvider>
  );
}

export default App;
