import { Button, Input, Snackbar, Stack } from "@mui/joy";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import type { LoginType } from "../../../types/user";
import { loginSchema } from "../../../schemas/user.schemas";
import { useState } from "react";
import useAuth from "../../../context/auth.context";
import { useLocation, useNavigate } from "react-router";
const LoginForm = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { state } = useLocation();

  const [open, setOpen] = useState<boolean>(false);

  const { register, handleSubmit } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "a@email.com",
      password: "a",
    },
  });

  const onSubmit = async (data: LoginType) => {
    console.log(data);
    await auth.login(data).then(() => navigate(state?.from || "/"));
  };

  const onError = () => {
    setOpen(true);
  };

  return (
    <Stack gap={2}>
      <Input placeholder="Email" {...register("email")} />
      <Input
        type="password"
        placeholder="Mot de passe"
        {...register("password")}
      />
      <Stack direction={"row"} gap={1}>
        <Button fullWidth onClick={handleSubmit(onSubmit, onError)}>
          Se connecter
        </Button>
        <Button
          fullWidth
          // onClick={() => navigate("/")}
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
  );
};

export default LoginForm;
