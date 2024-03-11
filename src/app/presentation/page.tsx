import CarouselPlugin from "@/components/CarouselPlugin";
import { CarouselItem } from "@/components/ui/carousel";
import { getImagesForCarousel } from "@/lib/data";
import { cn } from "@/lib/utils";
import plan from "@public/plan-domaine-lipica.svg";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Présentation",
};

const page = async () => {
  const images = await getImagesForCarousel();

  return (
    <>
      <h1>Présentation</h1>

      <section
        className={cn(
          "max-w-[600px] mx-14 space-y-4 flex flex-col items-center",
          "md:max-w-[800px] md:mx-18"
        )}
      >
        <h2 className="text-center text-blue-900">Installations</h2>
        <CarouselPlugin>
          {images.map((image) => (
            <CarouselItem key={image.id}>
              <Image
                src={image.url}
                alt={image.alt}
                width={800}
                height={600}
                sizes="(min-width: 1060px) 800px, (min-width: 780px) calc(32.69vw + 460px), 600px"
                priority={true}
              />
              <p className="text-center font-semibold text-lg">{image.title}</p>
            </CarouselItem>
          ))}
        </CarouselPlugin>
      </section>

      <section
        className={cn(
          "max-w-[600px] mx-4 space-y-4",
          "md:max-w-[800px] md:mx-8"
        )}
      >
        <h2 className="text-center text-blue-900">Plan</h2>
        <Image
          src={plan}
          sizes="(min-width: 1100px) 102px, (min-width: 1040px) calc(100vw - 987px), 68px"
          alt="Plan des installations du Domaine de Lipica"
          priority={true}
          className="w-screen h-auto"
        />
      </section>
    </>
  );
};

export default page;
