import { Box } from "@mui/joy";
import { Outlet } from "react-router";
import Header from "../../components/layout/Header";

function AppPreparateur() {
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

export default AppPreparateur;
