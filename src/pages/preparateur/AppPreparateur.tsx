import { Box } from "@mui/joy";
import { Outlet } from "react-router";

function AppPreparateur() {
    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateRows: "auto 1fr",
                height: "100dvh",
            }}
        >
            <Box component={"main"} sx={{ p: 1 }}>
                <Outlet />
            </Box>
        </Box>
    );
}

export default AppPreparateur;
