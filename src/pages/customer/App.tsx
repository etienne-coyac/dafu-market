import { Box } from "@mui/joy";
import Header from "../../components/layout/Header";
import { Outlet } from "react-router";
import { ClientContextProvider } from "../../context/client.context";

function App() {
  return (
    <ClientContextProvider>
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: "auto 1fr 1fr",
          height: "100dvh",
        }}
      >
        <Header />
        <Box component={"main"} sx={{ p: 1 }}>
          <Outlet />
        </Box>
      </Box>
    </ClientContextProvider>
  );
}

export default App;
