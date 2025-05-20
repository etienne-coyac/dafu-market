import { Box } from "@mui/joy";
import { Outlet } from "react-router";
import SideBar from "../../components/layout/sideBar/SideBar";

const AppAdmin = () => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        height: "100dvh",
      }}
    >
      <SideBar />
      <Box component={"main"} sx={{ p: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default AppAdmin;
