import { File } from "@web-std/file";
import { z } from "zod";

export const imageFormSchema = z.object({
  title: z.string().min(2, {
    message: "Ce champ est requis",
  }),
  alt: z.string().min(1, {
    message: "Ce champ est requis",
  }),
  image: z.instanceof(File),
});

export const createImageSchema = z.object({
  title: z.string(),
  alt: z.string(),
  image: z.instanceof(File).optional(),
});

export const updateImageSchema = z.object({
  title: z.string(),
  alt: z.string(),
  image: z.instanceof(File).optional(),
});
