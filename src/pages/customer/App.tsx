import { Box } from "@mui/joy";
import Header from "../../components/layout/Header";
import { Outlet } from "react-router";
import { AuthProvider } from "../../context/auth.context";

function App() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}

export default App;
