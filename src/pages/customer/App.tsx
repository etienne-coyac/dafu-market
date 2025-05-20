import { Box } from "@mui/joy";
import Header from "../../components/layout/Header";
import { Outlet } from "react-router";

function App() {
  return (
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
  );
}

export default App;
