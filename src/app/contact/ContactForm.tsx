"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import emailjs from "@emailjs/browser";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  firstname: z
    .string()
    .min(1, {
      message: "Ce champ est requis",
    })
    .refine(
      (value) => /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(value),
      "Le prénom doit commencer par une lettre majuscule, suivie de lettres minuscules, d'espaces, de tirets, d'apostrophes ou de points. Les caractères spéciaux ne sont pas autorisés."
    ),
  lastname: z
    .string()
    .min(1, {
      message: "Ce champ est requis",
    })
    .refine(
      (value) => /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(value),
      "Le prénom doit commencer par une lettre majuscule, suivie de lettres minuscules, d'espaces, de tirets, d'apostrophes ou de points. Les caractères spéciaux ne sont pas autorisés."
    ),
  email: z
    .string()
    .min(1, {
      message: "Ce champ est requis",
    })
    .email({
      message: "Cet email n'est pas valide",
    }),
  phone: z.string().length(10, {
    message:
      "Le numéro de téléphone doit commencer par un 0 et contenir 10 chiffres.",
  }),
  organization: z.string().min(1, {
    message: "Ce champ est requis",
  }),
  message: z.string().min(1, {
    message: "Ce champ est requis",
  }),
});

const ContactForm = () => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      organization: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { lastname, firstname, email, phone, organization, message } = values;
    const templateParams = {
      lastname,
      firstname,
      email,
      phone,
      organization,
      message,
    };
    const res = await emailjs.send(
      "service_0m8pnux",
      "template_z8bw8ae",
      templateParams,
      "8WUlGM-BWwXiHWYM4"
    );

    if (res.status === 200) {
      form.reset();
      toast({
        variant: "success",
        title: "Votre message a bien été envoyé",
        description: "Nous tâcherons d'y répondre dans les plus bref délais",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Votre message n'a pas été envoyé",
        description: "Veuillez réessayer",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full p-8 space-y-8 flex flex-col items-center"
      >
        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prénom</FormLabel>
              <FormControl>
                <Input autoComplete="given-name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input autoComplete="family-name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" autoComplete="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Téléphone</FormLabel>
              <FormControl>
                <Input type="tel" autoComplete="tel" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="organization"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Société</FormLabel>
              <FormControl>
                <Input autoComplete="family-name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full !mt-14 flex flex-col space-y-4">
          <Button size="lg" type="submit" className="font-bold">
            Valider et envoyer
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ContactForm;
