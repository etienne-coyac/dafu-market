import {
  Dropdown,
  MenuButton,
  IconButton,
  MenuItem,
  Typography,
  Divider,
  Menu,
  Avatar,
} from "@mui/joy";
import useAuth from "../../../context/auth.context";
import { useNavigate } from "react-router";
import useClientData from "../../../context/client.context";

const Profile = () => {
  const auth = useAuth();
  const { logout } = useClientData();
  const navigate = useNavigate();
  return (
    <Dropdown>
      <MenuButton
        sx={{ borderRadius: "50%", p: 0 }}
        slots={{ root: IconButton }}
        slotProps={{
          root: {
            variant: "soft",
            color: "neutral",
          },
        }}
      >
        <Avatar
          children={
            auth.user
              ? auth.user.prenom[0].toUpperCase() +
                auth.user.nom[0].toUpperCase()
              : undefined
          }
        />
      </MenuButton>
      <Menu placement="bottom-end">
        {auth.user ? (
          <>
            <MenuItem onClick={() => navigate("/commandes")}>
              <Typography>Mes commandes</Typography>
            </MenuItem>
            <MenuItem onClick={() => navigate("/listes")}>
              <Typography>Listes de courses</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => logout()}>
              <Typography>Déconnexion</Typography>
            </MenuItem>
          </>
        ) : (
          <MenuItem onClick={() => navigate("/login")}>
            <Typography>Connexion</Typography>
          </MenuItem>
        )}
      </Menu>
    </Dropdown>
  );
};
export default Profile;
