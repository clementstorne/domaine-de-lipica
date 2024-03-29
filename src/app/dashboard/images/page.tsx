import { getImagesForCarousel } from "@/lib/carouselData";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import ImageCard from "./ImageCard";

export const metadata: Metadata = {
  title: "Gérer les écuries",
};

const page = async () => {
  const images = await getImagesForCarousel();

  return (
    <>
      <h1>Gérer les images du carousel</h1>

      <section
        className={cn(
          "max-w-[600px] mx-4 flex flex-wrap items-stretch justify-center gap-4",
          "md:max-w-max md:mx-8"
        )}
      ></section>

      <section
        className={cn("max-w-[600px] mx-4 space-y-4", "md:max-w-max md:mx-8")}
      >
        <div className="flex flex-wrap justify-center justify-items-stretch items-stretch gap-4">
          {images.map((image) => (
            <ImageCard key={image.id} {...image} />
          ))}
        </div>
      </section>
    </>
  );
};

export default page;
