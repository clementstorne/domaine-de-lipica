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
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updatePartner } from "./action";

type PartnerFormProps = Partner;

const PartnerForm = ({ id, nom, informations, logo }: PartnerFormProps) => {
  const updatePartnerWithId = updatePartner.bind(null, id);

  const [imageUrl, setImageUrl] = useState(logo);

  const form = useForm<z.infer<typeof partnerFormSchema>>({
    resolver: zodResolver(partnerFormSchema),
    defaultValues: {
      nom: nom,
      informations: informations,
      image: undefined,
    },
  });

  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newLogo = e.target.files[0];

      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target && event.target.result) {
          const imageUrl = event.target.result as string;
          setImageUrl(imageUrl);
        }
      };

      reader.readAsDataURL(newLogo);

      form.setValue("image", newLogo);
    }
  };

  const handleUploadButtonClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    hiddenFileInput.current?.click();
  };

  return (
    <Form {...form}>
      <form
        action={updatePartnerWithId}
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

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block">Logo</FormLabel>
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={"Logo"}
                  width={600}
                  height={600}
                  className="h-1/2 w-1/2 mx-auto"
                />
              ) : (
                <></>
              )}
              <input
                type="file"
                name="image"
                id="logo"
                className="hidden"
                aria-describedby="logo-label"
                accept="image/png, image/jpg, image/jpeg, image/svg+xml, image/webp"
                ref={hiddenFileInput}
                onChange={handleImageInput}
              />

              <Button
                variant="outline"
                size="lg"
                className="w-full font-bold"
                onClick={handleUploadButtonClick}
              >
                {imageUrl ? "Changer de logo" : "Ajouter un logo"}
              </Button>
            </FormItem>
          )}
        />

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
