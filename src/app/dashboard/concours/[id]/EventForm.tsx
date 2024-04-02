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
import { DISCIPLINES, NIVEAUX } from "@/lib/const";
import { eventFormSchema } from "@/lib/eventSchemaValidation";
import { cn } from "@/lib/utils";
import { Event } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateEvent } from "./action";

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

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      debut: debut,
      fin: fin,
      discipline: discipline,
      niveau: levelsArray,
      horaires: horaires ? horaires : "",
      lienWinJump: lienWinJump ? lienWinJump : "",
    },
  });

  const onSubmit = async (values: z.infer<typeof eventFormSchema>) => {
    const niveau = values.niveau.join(" - ");
    const data = { id, ...values, niveau } as Event;
    await updateEvent(data);
    router.push("/dashboard/concours");
  };

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
              <FormLabel className="ml-2">Discipline</FormLabel>
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
                {NIVEAUX.map((item) => (
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
                              checked={field.value?.includes(item.label)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.label])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.label
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
            Enregistrer les modifications
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EventForm;
