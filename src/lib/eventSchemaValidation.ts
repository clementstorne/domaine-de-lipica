import { z } from "zod";

const disciplineEnum = z.enum([
  "cso",
  "hunter",
  "cce",
  "dressage",
  "attelage",
  "voltige",
  "endurance",
  "western",
  "horseball",
  "ponygames",
  "trec",
  "equifeel",
  "equifun",
  "ridebike",
  "riderun",
  "tiralarc",
]);
type disciplineEnum = z.infer<typeof disciplineEnum>;

export const eventFormSchema = z.object({
  debut: z
    .string()
    .min(1, {
      message: "Ce champ est requis",
    })
    .refine(
      (value) =>
        /^(20[2-9][0-9])-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/.test(
          value
        ),
      "Mauvais format de date"
    ),
  fin: z
    .string()
    .min(1, {
      message: "Ce champ est requis",
    })
    .refine(
      (value) =>
        /^(20[2-9][0-9])-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/.test(
          value
        ),
      "Mauvais format de date"
    ),
  discipline: z.string(),
  niveau: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Vous devez sélectionner au moins une option",
  }),
  horaires: z.string().optional(),
  lienWinJump: z.string().optional(),
});

export const createEventSchema = z.object({
  debut: z.string(),
  fin: z.string(),
  discipline: disciplineEnum,
  niveau: z.string(),
  horaires: z.string().optional(),
  lienWinJump: z.string().optional(),
});

export const updateEventSchema = z.object({
  id: z.string(),
  debut: z.string(),
  fin: z.string(),
  discipline: disciplineEnum,
  niveau: z.string(),
  horaires: z.string().optional(),
  lienWinJump: z.string().optional(),
});
