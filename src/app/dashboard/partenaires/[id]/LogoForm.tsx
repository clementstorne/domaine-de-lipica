"use client";

import { Button } from "@/components/ui/button";
import { Partner } from "@/types";
import Image from "next/image";
import { useRef, useState } from "react";
import { uploadLogo } from "./action";

type LogoFormProps = Partner;

const LogoForm = ({ id, nom, informations, logo }: LogoFormProps) => {
  const uploadLogoWithPartnerId = uploadLogo.bind(null, id);

  const [imageUrl, setImageUrl] = useState(logo);

  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleUploadButtonClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    hiddenFileInput.current?.click();
  };

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
    }
  };

  return (
    <form
      action={uploadLogoWithPartnerId}
      className="w-full p-8 space-y-2 flex flex-col items-center"
    >
      <label id="logo-label" htmlFor="logo" className="sr-only">
        {logo ? "Changer de logo" : "Ajouter un logo"}
      </label>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={"Logo de " + nom}
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

      <div className="relative flex flex-col"></div>
      <Button
        variant="outline"
        size="lg"
        className="w-full font-bold"
        onClick={handleUploadButtonClick}
      >
        Choisir un logo
      </Button>
      <Button size="lg" type="submit" className="w-full font-bold">
        {logo ? "Changer de logo" : "Ajouter un logo"}
      </Button>
    </form>
  );
};

export default LogoForm;
