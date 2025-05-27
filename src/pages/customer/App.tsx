import { Box } from "@mui/joy";
import Header from "../../components/layout/Header";
import { Outlet } from "react-router";
import { ClientContextProvider } from "../../context/client.context";
import { CartGuardProvider } from "../../context/cartGuard.context";
import AxiosInterceptor from "../../components/axios/AxiosInterceptor";
import { AuthProvider } from "../../context/auth.context";
import type { UserType } from "../../types/user";
import { login } from "../../api/services/auth";
import { getCurrentClient } from "../../api/clients.api";
import { useLocation } from "react-router";

function App() {
  const { pathname } = useLocation();
  return (
    <AxiosInterceptor>
      <AuthProvider<UserType>
        authStrategy={{
          loginFn: login,
          getCurrentUserFn: getCurrentClient,
          loginRoute: "/login",
        }}
      >
        <ClientContextProvider>
          <CartGuardProvider>
            <Box
              sx={{
                display: "grid",
                gridTemplateRows: "auto 1fr 1fr",
                height: "100dvh",
              }}
            >
              {pathname !== "/login" && <Header />}
              <Box
                component={"main"}
                sx={{ p: 1, maxWidth: "100dvw", boxSizing: "border-box" }}
              >
                <Outlet />
              </Box>
            </Box>
          </CartGuardProvider>
        </ClientContextProvider>
      </AuthProvider>
    </AxiosInterceptor>
  );
}

export default App;
