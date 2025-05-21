import { CssVarsProvider } from "@mui/joy";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router";
import customTheme from "./theme";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// To enable caching data, uncomment the staleTime option & comment the gcTime
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      gcTime: 0,
      refetchOnWindowFocus: false,
      // staleTime: 1000 * 60 * 60,
    },
  },
});

const AppProviders = () => {
  return (
    <CssVarsProvider theme={customTheme}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />

        <Outlet />
      </QueryClientProvider>
    </CssVarsProvider>
  );
};

export default AppProviders;
