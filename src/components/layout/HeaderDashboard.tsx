import { Stack, Typography, IconButton } from "@mui/joy";
import { useRef } from "react";

const HeaderDashboard = () => {
  const headerRef = useRef<HTMLDivElement>(null);

  return (
    <Stack
      component={"header"}
      ref={headerRef}
      direction={"row"}
      sx={{
        position: "sticky",
        top: 0,
        left: 0,
        background: "white",
        zIndex: 2,
        borderBottom: "1px solid lightGrey",
        justifyContent: "space-between",
        alignItems: "center",
        p: 1.5,
        rowGap: 1,
        flexWrap: "wrap",
      }}
    >
      <Stack direction={"row"} gap={1} alignItems={"center"}>
        <Typography
          level={"h1"}
        >
          DAFU Market
        </Typography>
      </Stack>
      <IconButton variant="outlined" size="sm" color="neutral">
        🚚
      </IconButton>
    </Stack >
  );
};

export default HeaderDashboard;
