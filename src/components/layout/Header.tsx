import { Shop2 } from "@mui/icons-material";
import { Stack, IconButton } from "@mui/joy";

const Header = () => {
  return (
    <Stack direction={"row"} borderBottom={"1px solid lightGrey"} padding={1}>
      <IconButton>
        <Shop2 />
      </IconButton>
    </Stack>
  );
};

export default Header;
