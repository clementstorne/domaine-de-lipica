"use client";

import { Partner } from "@/types";
import { CldImage } from "next-cloudinary";

type PartnerLogoProps = Omit<Partner, "id" | "informations"> & {
  size?: number;
};

const PartnerLogo = ({ logo, nom, size = 600 }: PartnerLogoProps) => {
  return logo ? (
    <CldImage width={size} height={size} src={logo} alt={"Logo de " + nom} />
  ) : (
    <></>
  );
};

export default PartnerLogo;
