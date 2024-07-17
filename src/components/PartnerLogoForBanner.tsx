"use client";

import { cn } from "@/lib/utils";
import { Partner } from "@/types";
import { CldImage } from "next-cloudinary";

type PartnerLogoProps = Omit<Partner, "id" | "informations"> & {
  size?: number;
};

const PartnerLogoForBanner = ({ logo, nom, size = 600 }: PartnerLogoProps) => {
  return (
    <div
      className={cn(
        "flex h-14 w-14 items-center justify-center",
        "md:h-20 md:w-20",
        logo && "bg-white",
        !logo && "bg-gray-400"
      )}
    >
      {logo ? (
        <CldImage
          width={size}
          height={size}
          src={logo}
          alt={"Logo de " + nom}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default PartnerLogoForBanner;
