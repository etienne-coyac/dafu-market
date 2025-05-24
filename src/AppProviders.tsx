import { CssVarsProvider } from "@mui/joy";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router";
import customTheme from "./theme";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthProvider } from "./context/auth.context";
import { SnackbarProvider } from "./providers/snackbar/SnackbarProvider";

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

export const enableCache = (hours: number = 1) => ({
  gcTime: 1000 * 60 * 60 * hours,
  staleTime: 1000 * 60 * 60 * hours,
});

const AppProviders = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CssVarsProvider theme={customTheme}>
          <SnackbarProvider>
            <ReactQueryDevtools initialIsOpen={false} />

            <Outlet />
          </SnackbarProvider>
        </CssVarsProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default AppProviders;
