import * as z from "zod";

export const postitSchema = z.object({
  titre: z.string(),
  contenu: z.string(),
});
