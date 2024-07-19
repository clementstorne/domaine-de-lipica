import CloudinaryImage from "@/components/CloudinaryImage";
import { getPartnersLogos } from "@/lib/partnerData";
import { cn } from "@/lib/utils";

const PartnersBanner = async () => {
  const partners = await getPartnersLogos();

  return (
    <section
      className={cn(
        "max-w-[600px] mx-4 flex flex-wrap items-stretch justify-center gap-4",
        "md:max-w-max md:mx-8"
      )}
    >
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
        {partners.map((partner) => (
          <div
            key={partner.id}
            className={cn(
              "flex h-14 w-14 items-center justify-center",
              "md:h-20 md:w-20",
              partner.logo && "bg-white",
              !partner.logo && "bg-gray-400"
            )}
          >
            {partner.logo ? (
              <CloudinaryImage
                id={partner.logo}
                alt={`Logo de ${partner.nom}`}
                size={600}
              />
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
};

export default PartnersBanner;
