import { cn } from "@/lib/utils";
import { Partner } from "@/types";
import Image from "next/image";

type PartnerLogoProps = Omit<Partner, "id" | "informations">;

const PartnerLogo = ({ logo, nom }: PartnerLogoProps) => {
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
        <Image src={logo} alt={"Logo de " + nom} width={800} height={600} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default PartnerLogo;
