import { Box } from "@mui/joy";
import Header from "../../components/layout/Header";
import { Outlet } from "react-router";
import { ClientContextProvider } from "../../context/client.context";
import { CartGuardProvider } from "../../context/cartGuard.context";
import AxiosInterceptor from "../../components/axios/AxiosInterceptor";

function App() {
  return (
    <AxiosInterceptor>
      <ClientContextProvider>
        <CartGuardProvider>
          <Box
            sx={{
              display: "grid",
              gridTemplateRows: "auto 1fr 1fr",
              height: "100dvh",
            }}
          >
            <Header />
            <Box
              component={"main"}
              sx={{ p: 1, maxWidth: "100dvw", boxSizing: "border-box" }}
            >
              <Outlet />
            </Box>
          </Box>
        </CartGuardProvider>
      </ClientContextProvider>
    </AxiosInterceptor>
  );
}

export default App;
