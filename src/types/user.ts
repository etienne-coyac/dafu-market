import * as z from "zod";
import type { loginSchema, registerSchema } from "../schemas/user.schemas";

export type LoginType = z.infer<typeof loginSchema>;
export type RegisterType = z.infer<typeof registerSchema>;

export type UserType = {
  idClient: number;
  nom: string;
  prenom: string;
  email: string;
  ville: string;
  numero: string;
  adresse: string;
  cp: string;
  telephone: string;
};

// personnel

export type PersonnelType = {
  idPersonnel: number;
  nom: string;
  prenom: string;
  idRole: number;
  idMagasin: number;
};
