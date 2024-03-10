import { getPartners } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import PartnerCard from "./PartnerCard";

export const metadata: Metadata = {
  title: "Partenaires",
};

const page = async () => {
  const partners = await getPartners();

  return (
    <>
      <h1>Partenaires</h1>

      <section
        className={cn(
          "max-w-[600px] mx-4 flex flex-wrap items-stretch justify-center gap-4",
          "md:max-w-max md:mx-8"
        )}
      >
        {partners.map((partner) => (
          <PartnerCard
            key={partner.id}
            nom={partner.nom}
            logo={partner.logo}
            informations={partner.informations}
          />
        ))}
      </section>
    </>
  );
};

export default page;
