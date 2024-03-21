import { z } from "zod";

export const partnerFormSchema = z.object({
  nom: z.string().min(2, {
    message: "Ce champ est requis",
  }),
  informations: z.string().min(1, {
    message: "Ce champ est requis",
  }),
  logo: z.string().optional(),
});

export const updatePartnerSchema = z.object({
  id: z.string(),
  nom: z.string(),
  informations: z.string(),
  logo: z.string().optional(),
});
