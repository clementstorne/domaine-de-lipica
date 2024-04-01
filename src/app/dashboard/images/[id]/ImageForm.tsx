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
import { imageFormSchema } from "@/lib/imageSchemaValidation";
import { CarouselImage } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateImage } from "./action";

type ImageFormProps = CarouselImage;

const ImageForm = ({ id, title, alt, url }: ImageFormProps) => {
  const updatePartnerWithId = updateImage.bind(null, id);

  const [imageUrl, setImageUrl] = useState(url);

  const form = useForm<z.infer<typeof imageFormSchema>>({
    resolver: zodResolver(imageFormSchema),
    defaultValues: {
      title: title,
      alt: alt,
      image: undefined,
    },
  });

  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newImage = e.target.files[0];

      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target && event.target.result) {
          const imageUrl = event.target.result as string;
          setImageUrl(imageUrl);
        }
      };

      reader.readAsDataURL(newImage);

      form.setValue("image", newImage);
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
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block">Photo</FormLabel>
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={"Logo"}
                  width={600}
                  height={600}
                  className="h-full w-full mx-auto"
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
                {imageUrl ? "Changer de photo" : "Ajouter une photo"}
              </Button>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="alt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
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

export default ImageForm;
