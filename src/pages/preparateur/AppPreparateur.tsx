import { Box } from "@mui/joy";
import { Outlet } from "react-router";
import HeaderDashboard from "../../components/layout/HeaderDashboard";

function AppPreparateur() {
    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateRows: "auto 1fr",
                height: "100dvh",
            }}
        >
            <HeaderDashboard />
            <Box component={"main"} sx={{ p: 1 }}>
                <Outlet />
            </Box>
        </Box>
    );
}

export default AppPreparateur;
