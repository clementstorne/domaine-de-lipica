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
import { stableFormSchema } from "@/lib/stableSchemaValidation";
import { StableWithImages } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { deleteSingleImage, updateStable } from "./action";

type StableFormProps = StableWithImages;

const StableForm = ({
  id,
  nom,
  informations,
  url,
  images,
}: StableFormProps) => {
  const updateStableWithId = updateStable.bind(null, id);

  const [imagesList, setImagesList] = useState(
    images.map((image, index) => ({
      id: index,
      url: image.url,
    }))
  );

  const form = useForm<z.infer<typeof stableFormSchema>>({
    resolver: zodResolver(stableFormSchema),
    defaultValues: {
      nom: nom,
      informations: informations,
      image: undefined,
    },
  });

  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFiles = Array.from(e.target.files);

      selectedFiles.map((file) => {
        const newLogo = file;
        const reader = new FileReader();

        reader.onload = (event) => {
          if (event.target && event.target.result) {
            const newImagesUrl = event.target.result as string;
            const id = Date.now();
            const newImage = { id, url: newImagesUrl };
            setImagesList((prevImages) => [...prevImages, newImage]);
          }
        };

        reader.readAsDataURL(newLogo);
      });

      form.setValue("image", selectedFiles);
    }
  };

  const handleUploadButtonClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    hiddenFileInput.current?.click();
  };

  const handleRemoveImage = async (
    e: React.MouseEvent<HTMLElement>,
    id: number,
    image: string
  ) => {
    const updatedImagesList = imagesList.filter((img) => img.id !== id);
    setImagesList(updatedImagesList);

    const newImages = form.getValues("image");
    if (newImages) {
      const newImagesWithoutDeleted = newImages.filter(
        (_, index) => imagesList[index].id !== id
      );
      form.setValue("image", newImagesWithoutDeleted);
    } else {
      await deleteSingleImage(image);
    }
  };

  return (
    <Form {...form}>
      <form
        action={updateStableWithId}
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
              <FormLabel className="block">Photos</FormLabel>
              <div className="grid grid-cols-3 gap-4 items-center">
                {imagesList.length > 0 ? (
                  imagesList.map((image, index) => (
                    <div className="relative" key={image.id}>
                      <Image
                        src={image.url}
                        alt={"Image de présentation de " + nom}
                        width={400}
                        height={400}
                      />
                      <Button
                        size="icon"
                        className="absolute z-10 top-1 right-1"
                        onClick={(e) =>
                          handleRemoveImage(e, image.id, image.url)
                        }
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  ))
                ) : (
                  <></>
                )}
              </div>
              <input
                type="file"
                multiple
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
                Ajouter des photos
              </Button>
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

export default StableForm;
