import { Stack } from "@mui/joy";

import LoginForm from "../../../components/ui/login/LoginForm";

const LoginPage = () => {
  return (
    <Stack
      sx={{ minHeight: "100dvh", width: "100%" }}
      justifyContent={"center"}
      alignItems={"center"}
      p={2}
      boxSizing={"border-box"}
    >
      <LoginForm />
    </Stack>
  );
};

export default LoginPage;
