import {
  Sheet,
  Stack,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Typography,
} from "@mui/joy";
import LoginForm from "../../../components/ui/login/LoginForm";
import RegisterForm from "../../../components/ui/login/RegisterForm";
import useAuth from "../../../context/auth.context";
import { Navigate } from "react-router";

const LoginPage = () => {
  const auth = useAuth();

  if (auth.user) return <Navigate to="/" />;
  return (
    <Stack
      sx={{ minHeight: "100dvh", width: "100%" }}
      justifyContent={"center"}
      alignItems={"center"}
      p={2}
      boxSizing={"border-box"}
      gap={5}
    >
      <Typography level="h1">DAFU Market</Typography>
      <Sheet
        variant="outlined"
        sx={{
          width: { xs: "100%", sm: "400px" },
          p: 2,
          boxSizing: "border-box",
        }}
      >
        <Tabs>
          <TabList>
            <Tab>Se connecter</Tab>
            <Tab>Créer un compte</Tab>
          </TabList>
          <TabPanel value={0}>
            <LoginForm />
          </TabPanel>
          <TabPanel value={1}>
            <RegisterForm />
          </TabPanel>
        </Tabs>
      </Sheet>
    </Stack>
  );
};

export default LoginPage;
