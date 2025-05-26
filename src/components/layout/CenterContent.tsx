import { Box, Stack } from "@mui/joy";

const CenterContent = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        p: 2,
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      <Stack gap={2} sx={{ width: "100%", maxWidth: "1000px" }}>
        {children}
      </Stack>
    </Box>
  );
};

export default CenterContent;
