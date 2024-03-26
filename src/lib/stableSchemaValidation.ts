import { File } from "@web-std/file";
import { z } from "zod";

export const stableFormSchema = z.object({
  nom: z.string().min(2, {
    message: "Ce champ est requis",
  }),
  informations: z.string().min(1, {
    message: "Ce champ est requis",
  }),
  image: z.array(z.instanceof(File)).optional(),
});
