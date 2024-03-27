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

  const [imagesList, setimagesList] = useState(
    images.map((image) => image.url)
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
            setimagesList((prevImages) => [...prevImages, newImagesUrl]);
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
    index: number,
    image: string
  ) => {
    const updatedImagesList = [...imagesList];
    updatedImagesList.splice(index, 1);
    setimagesList(updatedImagesList);

    const newImages = form.getValues("image");
    console.log("avant", newImages);
    if (newImages) {
      const offset = images.length;
      newImages.splice(index - offset, 1);
      console.log("après", newImages);
      form.setValue("image", newImages);
    }

    await deleteSingleImage(image);
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
                    <div className="relative" key={image}>
                      <Image
                        src={image}
                        alt={"Image de présentation de " + nom}
                        width={400}
                        height={400}
                      />
                      <Button
                        size="icon"
                        className="absolute z-10 top-1 right-1"
                        onClick={(e) => handleRemoveImage(e, index, image)}
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
            Modifier l&apos;écurie
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default StableForm;
