import { getSingleStable } from "@/lib/data";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";
import StableForm from "./StableForm";

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}) => {
  const stable = await getSingleStable(params.id);

  if (!stable) {
    redirect("/dashboard/ecuries");
  }

  return {
    title: stable.nom,
  };
};

const page = async ({ params }: { params: { id: string } }) => {
  const stable = await getSingleStable(params.id);

  if (!stable) {
    redirect("/dashboard/ecuries");
  }

  return (
    <>
      <h1>Ajouter une écurie</h1>

      <section
        className={cn(
          "max-w-[600px] w-full mx-4 space-y-4",
          "md:max-w-[800px] md:w-1/2 md:mx-8"
        )}
      >
        <StableForm />
      </section>
    </>
  );
};

export default page;
