import { CssVarsProvider as JoyCssVarsProvider } from "@mui/joy/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router";
import customTheme from "./theme";
import {
  SnackbarProvider,
  useSnackbar,
} from "./providers/snackbar/SnackbarProvider";
import {
  createTheme,
  ThemeProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { useEffect } from "react";
import { registerSnackbar } from "./providers/snackbar/snackbar";
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
const materialTheme = createTheme();

const SnackbarRegister = () => {
  const { show } = useSnackbar();

  useEffect(() => {
    registerSnackbar(show);
  }, [show]);

  return null;
};

const AppProviders = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
          <JoyCssVarsProvider theme={customTheme}>
            <CssBaseline enableColorScheme />

            <SnackbarProvider>
              {/* <ReactQueryDevtools initialIsOpen={false} /> */}
              <SnackbarRegister />
              <Outlet />
            </SnackbarProvider>
          </JoyCssVarsProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </LocalizationProvider>
  );
};

export default AppProviders;
