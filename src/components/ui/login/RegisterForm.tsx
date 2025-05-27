import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Divider, Input, Stack } from "@mui/joy";
import { useForm, type SubmitErrorHandler } from "react-hook-form";
import { registerSchema } from "../../../schemas/user.schemas";
import type { RegisterType } from "../../../types/user";
import { snackbar } from "../../../providers/snackbar/snackbar";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "../../../api/services/auth";

type RegisterFormProps = {
  nextAction: () => void;
};
const RegisterForm = (props: RegisterFormProps) => {
  const { nextAction } = props;
  const { register, handleSubmit } = useForm<RegisterType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nom: "test",
      prenom: "test",
      ville: "test",
      numero: "test",
      adresse: "test",
      cp: "31000",
      email: "test@test.test",
      password: "test",
    },
  });

  const createUserMutation = useMutation({
    mutationFn: createAccount,
    onSuccess: () => {
      snackbar.success({ text: "Compte créé" });
      nextAction();
    },
    onError: () => {
      snackbar.error({ text: "Une erreur est survenue" });
    },
  });

  const onSubmit = (data: RegisterType) => createUserMutation.mutate(data);
  const onError: SubmitErrorHandler<RegisterType> = (err) => {
    console.log(err);
    snackbar.error({ text: "Veuillez remplir tous les champs" });
  };

  return (
    <Stack gap={2}>
      <Input placeholder="Nom" {...register("nom")} />
      <Input placeholder="Prenom" {...register("prenom")} />
      <Input placeholder="Code postal" {...register("cp")} />
      <Input placeholder="Ville" {...register("ville")} />
      <Input placeholder="Numéro de rue" {...register("numero")} />
      <Input placeholder="Nom de rue" {...register("numero")} />
      <Divider />
      <Input placeholder="Email" {...register("email")} />
      <Input
        type="password"
        placeholder="Mot de passe"
        {...register("password")}
      />
      <Button onClick={() => handleSubmit(onSubmit, onError)()}>
        Créer un compte
      </Button>
    </Stack>
  );
};

export default RegisterForm;
