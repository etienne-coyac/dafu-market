import { Box, CssVarsProvider } from "@mui/joy";
import Header from "./components/layout/Header";
import { Outlet } from "react-router";
import customTheme from "./theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
function App() {
  return (
    <CssVarsProvider theme={customTheme}>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Box component={"main"} sx={{ p: 1 }}>
          <Outlet />
        </Box>
      </QueryClientProvider>
    </CssVarsProvider>
  );
}

export default App;
