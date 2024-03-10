import Image from "next/image";

import NextEventsSection from "@/components/NextEventsSection";
import { cn } from "@/lib/utils";
import concours from "@public/concours-saut-obstacles.webp";
import manege from "@public/entree-manege.webp";

const page = () => {
  return (
    <>
      <h1>Bienvenue au Centre Équestre du Domaine de Lipica !</h1>
      <section
        className={cn(
          "max-w-[600px] mx-4 space-y-4",
          "md:max-w-[800px] md:mx-8 md:grid md:grid-cols-5 items-center md:gap-x-4"
        )}
      >
        <p className="md:col-span-3">
          Situé à Ozoir la Ferrière (77), à seulement 25 km à l&apos;est de
          Paris, notre centre offre une gamme complète d&apos;activités
          équestres, allant du Poney Club à plusieurs écuries de propriétaires.
          Toutes les disciplines équestres, de l&apos;initiation à la
          compétition, sont enseignées par des moniteurs expérimentés. Nous
          proposons également la vente et la location de poneys et chevaux.
        </p>

        <Image
          src={manege}
          sizes="(min-width: 780px) 287px, (min-width: 640px) 568px, 93.75vw"
          alt="Entrée du manège au Domaine de Lipica"
          className="w-full m-auto md:col-span-2 md:mx-0 md:w-full"
        />

        <p className="md:col-span-5">
          Idéalement situé à proximité de la forêt domaniale
          d&apos;Armainvilliers et des principales voies de circulation, le
          Domaine de Lipica offre un équilibre parfait entre la tranquillité de
          la nature et la facilité d&apos;accès depuis Paris.
        </p>

        <Image
          src={concours}
          sizes="(min-width: 780px) 287px, (min-width: 640px) 568px, 93.75vw"
          alt="Concours de saut d'obstacles au Domaine de Lipica"
          className={cn("w-full m-auto", "md:col-span-2")}
        />
        <div className="space-y-4 md:col-span-3">
          <p>
            Pour les passionnés de compétition, notre centre offre un accès
            exclusif à des événements équestres, des stages de perfectionnement,
            et l&apos;organisation de manifestations.
          </p>

          <p>
            Venez découvrir l&apos;équitation dans un cadre exceptionnel, où la
            passion des chevaux rencontre l&apos;excellence équestre.
          </p>
        </div>
      </section>

      <NextEventsSection />
    </>
  );
};

export default page;
