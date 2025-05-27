import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  nom: z.string().nonempty(),
  prenom: z.string().nonempty(),
  ville: z.string().nonempty(),
  numero: z.string().nonempty(), // numero rue
  adresse: z.string().nonempty(),
  cp: z.string().length(5),
});
