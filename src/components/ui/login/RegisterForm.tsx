import { Button, Divider, Input, Stack } from "@mui/joy";

const RegisterForm = () => {
  return (
    <Stack gap={2}>
      <Input placeholder="Nom" />
      <Input placeholder="Prenom" />
      <Input placeholder="Code postal" />
      <Input placeholder="Ville" />
      <Input placeholder="Numéro de rue" />
      <Input placeholder="Nom de rue" />
      <Divider />
      <Input placeholder="Email" />
      <Input placeholder="Mot de passe" />
      <Button>Créer un compte</Button>
    </Stack>
  );
};

export default RegisterForm;
