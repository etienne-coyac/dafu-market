import { Button, Input, Snackbar, Stack } from "@mui/joy";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";
import type { LoginType } from "../../../types/user";
import { loginSchema } from "../../../schemas/user.schemas";
import { useState } from "react";
import useAuth from "../../../context/auth.context";
const LoginForm = () => {
  const auth = useAuth();

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
    await auth.login(data);
  };

  const onError = () => {
    setOpen(true);
  };

  console.log("render form");
  return (
    <Stack gap={2}>
      <Input placeholder="Email" {...register("email")} />
      <Input
        type="password"
        placeholder="Mot de passe"
        {...register("password")}
      />
      <Button onClick={handleSubmit(onSubmit, onError)}>Se connecter</Button>
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
