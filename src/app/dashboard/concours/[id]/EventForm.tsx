"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { DISCIPLINES } from "@/lib/disciplineUtils";
import { toCamelCase } from "@/lib/strUtils";
import { cn } from "@/lib/utils";
import { Event } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  debut: z
    .string()
    .min(1, {
      message: "Ce champ est requis",
    })
    .refine(
      (value) =>
        /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/.test(value),
      "Mauvais format de date"
    ),
  fin: z
    .string()
    .min(1, {
      message: "Ce champ est requis",
    })
    .refine(
      (value) =>
        /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/.test(value),
      "Mauvais format de date"
    ),
  discipline: z.string(),
  niveau: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Vous devez sélectionner au moins une option",
  }),
  horaires: z.string(),
  lienWinJump: z.string(),
});

type EventFormProps = Event;

const EventForm = ({
  id,
  debut,
  fin,
  discipline,
  niveau,
  horaires,
  lienWinJump,
}: EventFormProps) => {
  const router = useRouter();

  const levelsArray = niveau.split(" - ");
  const formatedLevels = levelsArray.map((level) => toCamelCase(level));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      debut: debut,
      fin: fin,
      discipline: discipline,
      niveau: formatedLevels,
      horaires: horaires,
      lienWinJump: lienWinJump,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  const levels = [
    {
      id: "amateur",
      label: "Amateur",
    },
    {
      id: "pro",
      label: "Pro",
    },
    {
      id: "cyclesLibres",
      label: "Cycles Libres",
    },
    {
      id: "cyclesClassiques",
      label: "Cycles Classiques",
    },
    {
      id: "club",
      label: "Club",
    },
    {
      id: "poney",
      label: "Poney",
    },
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full p-8 space-y-8 flex flex-col items-center"
      >
        <FormField
          control={form.control}
          name="debut"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date de début</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="fin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date de fin</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="discipline"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="ml-2">Rôle</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className={cn(
                    "flex flex-col p-4",
                    "md:grid md:grid-cols-2",
                    "lg:grid-cols-3"
                  )}
                >
                  {DISCIPLINES.map((discipline) => (
                    <FormItem
                      key={discipline.code}
                      className="flex items-center space-x-3 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={discipline.code} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {discipline.name}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="niveau"
          render={() => (
            <FormItem>
              <FormLabel>Niveau</FormLabel>
              <div
                className={cn(
                  "rounded-md border border-blue-900 bg-white p-4 shadow-sm transition-colors gap-2",
                  "md:grid md:grid-cols-2",
                  "lg:grid-cols-3"
                )}
              >
                {levels.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="niveau"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="horaires"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Horaires</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lienWinJump"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lien WinJump</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full !mt-14 flex flex-col space-y-4">
          <Button size="lg" type="submit" className="font-bold">
            Modifier le concours
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EventForm;
