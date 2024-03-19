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
import { partnerFormSchema } from "@/lib/partnerSchemaValidation";
import { Partner } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updatePartner } from "./action";

type PartnerFormProps = Partner;

const PartnerForm = ({ id, nom, informations, logo }: PartnerFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof partnerFormSchema>>({
    resolver: zodResolver(partnerFormSchema),
    defaultValues: {
      nom: nom,
      informations: informations,
    },
  });

  const onSubmit = async (values: z.infer<typeof partnerFormSchema>) => {
    const data = { id, ...values } as Partner;
    console.log(data);
    await updatePartner(data);
    router.push("/dashboard/partenaires");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full p-8 space-y-8 flex flex-col items-center"
      >
        <FormField
          control={form.control}
          name="nom"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="informations"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Informations</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {logo ? (
          <Image src={logo} alt={"Logo de " + nom} width={600} height={600} />
        ) : null}

        {logo ? (
          <Button variant="outline" size="lg" className="font-bold">
            Changer de logo
          </Button>
        ) : (
          <Button size="lg" className="font-bold">
            Ajouter un logo
          </Button>
        )}

        <div className="w-full !mt-14 flex flex-col space-y-4">
          <Button size="lg" type="submit" className="font-bold">
            Modifier le partenaire
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PartnerForm;
