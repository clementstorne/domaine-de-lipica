import { getSinglePartner } from "@/lib/data";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";
import LogoForm from "./LogoForm";
import PartnerForm from "./PartnerForm";

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}) => {
  const partner = await getSinglePartner(params.id);

  if (!partner) {
    redirect("/dashboard/partenaires");
  }

  return {
    title: partner.nom,
  };
};

const page = async ({ params }: { params: { id: string } }) => {
  const partner = await getSinglePartner(params.id);

  if (!partner) {
    redirect("/dashboard/partenaires");
  }

  return (
    <>
      <h1>Modifier un partenaire</h1>

      <section
        className={cn(
          "max-w-[600px] w-full mx-4 space-y-4",
          "md:max-w-[800px] md:w-1/2 md:mx-8"
        )}
      >
        <LogoForm {...partner} />
        <PartnerForm {...partner} />
      </section>
    </>
  );
};

export default page;
