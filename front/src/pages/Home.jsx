import { NextEvents } from "../components/index";

export default function Home() {
  return (
    <>
      <h1>Bienvenue au Centre Équestre du Domaine de Lipica !</h1>
      <main>
        <div className="md:mb-8 md:grid md:grid-cols-5 md:items-center md:gap-x-8">
          <p className="paragraph md:col-span-3">
            Situé à Ozoir la Ferrière (77), à seulement 25 km à l&apos;est de
            Paris, notre centre offre une gamme complète d&apos;activités
            équestres, allant du Poney Club à plusieurs écuries de
            propriétaires. Toutes les disciplines équestres, de
            l&apos;initiation à la compétition, sont enseignées par des
            moniteurs expérimentés. Nous proposons également la vente et la
            location de poneys et chevaux.
          </p>
          <img
            src="/home1.webp"
            alt="Entrée du grand manège du domaine de Lipica"
            className="w-full m-auto mb-4 sm:w-3/4 md:col-span-2 md:mx-0 md:w-full"
          />
        </div>
        <p className="paragraph md:mb-8 ">
          Idéalement situé à proximité de la forêt domaniale
          d&apos;Armainvilliers et des principales voies de circulation, le
          Domaine de Lipica offre un équilibre parfait entre la tranquillité de
          la nature et la facilité d&apos;accès depuis Paris.
        </p>
        <div className="md:mb-8 md:grid md:grid-cols-5 md:items-center md:gap-x-8">
          <img
            src="home2.webp"
            alt="Compétition en extérieur organisée au domaine de Lipica"
            className="w-full m-auto mb-4 sm:w-7/12 md:col-span-2 md:mx-0 md:w-full"
          />
          <div className="md:col-span-3 md:text-xl">
            <p className="paragraph md:mb-8">
              Pour les passionnés de compétition, notre centre offre un accès
              exclusif à des événements équestres, des stages de
              perfectionnement, et l&apos;organisation de manifestations.
            </p>
            <p>
              Venez découvrir l&apos;équitation dans un cadre exceptionnel, où
              la passion des chevaux rencontre l&apos;excellence équestre.
            </p>
          </div>
        </div>
      </main>

      <NextEvents />
    </>
  );
}
