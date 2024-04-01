import { getSingleImage } from "@/lib/carouselData";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import ImageForm from "./ImageForm";

export const metadata: Metadata = {
  title: "Modifier une image du carousel",
};

const page = async ({ params }: { params: { id: string } }) => {
  const image = await getSingleImage(params.id);

  if (!image) {
    redirect("/dashboard/images");
  }

  return (
    <>
      <h1>Modifier une image du carousel</h1>

      <section
        className={cn(
          "max-w-[600px] w-full mx-4 space-y-4",
          "md:max-w-[800px] md:w-1/2 md:mx-8"
        )}
      >
        <ImageForm {...image} />
      </section>
    </>
  );
};

export default page;
