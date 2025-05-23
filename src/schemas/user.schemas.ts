import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  nom: z.string(),
  prenom: z.string(),
  ville: z.string(),
  numero: z.string(), // numero rue
  adresse: z.string(),
  cp: z.string(),
  telephone: z.string(),
});
