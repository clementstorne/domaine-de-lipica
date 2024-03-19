import { getPartners } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import PartnerCard from "./PartnerCard";

export const metadata: Metadata = {
  title: "Gérer les partenaires",
};

const page = async () => {
  const partners = await getPartners();

  return (
    <>
      <h1>Gérer les partenaires</h1>

      <section
        className={cn(
          "max-w-[600px] mx-4 flex flex-wrap items-stretch justify-center gap-4",
          "md:max-w-max md:mx-8"
        )}
      ></section>

      <section
        className={cn("max-w-[600px] mx-4 space-y-4", "md:max-w-max md:mx-8")}
      >
        <div className="flex flex-wrap justify-center items gap-4">
          {partners.map((partner) => (
            <PartnerCard key={partner.id} {...partner} />
          ))}
        </div>
      </section>
    </>
  );
};

export default page;
