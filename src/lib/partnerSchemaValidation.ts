import { File } from "@web-std/file";
import { z } from "zod";

export const partnerFormSchema = z.object({
  nom: z.string().min(2, {
    message: "Ce champ est requis",
  }),
  informations: z.string().min(1, {
    message: "Ce champ est requis",
  }),
  image: z.instanceof(File).optional(),
});

export const createPartnerSchema = z.object({
  nom: z.string(),
  informations: z.string(),
  image: z.instanceof(File).optional(),
});

export const updatePartnerSchema = z.object({
  id: z.string(),
  nom: z.string(),
  informations: z.string(),
  logo: z.string().optional(),
});
