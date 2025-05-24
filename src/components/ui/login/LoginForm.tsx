import {
  Button,
  Input,
  Sheet,
  Snackbar,
  Stack,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Typography,
} from "@mui/joy";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import type { LoginType } from "../../../types/user";
import { loginSchema } from "../../../schemas/user.schemas";
import { useState } from "react";
import useAuth from "../../../context/auth.context";
import { useLocation, useNavigate } from "react-router";
import RegisterForm from "./RegisterForm";

type LoginFormProps = {
  onSubmitCustom?: () => void;
  onCancelCustom?: () => void;
};

const LoginForm = (props: LoginFormProps) => {
  const { onSubmitCustom, onCancelCustom } = props;
  const auth = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const { register, handleSubmit } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "a@email.com",
      password: "a",
    },
  });

  const onSubmit = async (data: LoginType) => {
    setLoading(true);
    await auth
      .login(data)
      .then(() => {
        if (onSubmitCustom) onSubmitCustom();
        else navigate(state?.from ?? "/");
      })
      .finally(() => setLoading(false));
  };

  const onError = () => {
    setOpen(true);
  };

  return (
    <Stack gap={1}>
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
            <Stack gap={2}>
              <Input placeholder="Email" {...register("email")} />
              <Input
                type="password"
                placeholder="Mot de passe"
                {...register("password")}
              />
              <Stack direction={"row"} gap={1}>
                <Button
                  fullWidth
                  onClick={handleSubmit(onSubmit, onError)}
                  loading={loading}
                >
                  Se connecter
                </Button>
                <Button
                  fullWidth
                  disabled={loading}
                  onClick={() => {
                    if (onCancelCustom) onCancelCustom();
                    else navigate("/");
                  }}
                  color="neutral"
                  variant="soft"
                >
                  Retour
                </Button>
              </Stack>
              <Snackbar
                autoHideDuration={4000}
                open={open}
                variant={"soft"}
                color={"danger"}
                onClose={() => setOpen(false)}
              >
                Veuillez remplir vos informations de connexion
              </Snackbar>
            </Stack>
          </TabPanel>
          <TabPanel value={1}>
            <RegisterForm />
          </TabPanel>
        </Tabs>
      </Sheet>
    </Stack>
  );
};

export default LoginForm;
