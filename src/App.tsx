import { Box, CssVarsProvider } from "@mui/joy";
import Header from "./components/layout/Header";
import { Outlet } from "react-router";
import customTheme from "./theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 60,
    },
  },
});

function App() {
  return (
    <CssVarsProvider theme={customTheme}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Box
          sx={{
            display: "grid",
            gridTemplateRows: "auto 1fr",
            height: "100dvh",
          }}
        >
          <Header />
          <Box component={"main"} sx={{ p: 1 }}>
            <Outlet />
          </Box>
        </Box>
      </QueryClientProvider>
    </CssVarsProvider>
  );
}

export default App;
