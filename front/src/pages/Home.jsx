import NextEvents from "../layouts/NextEvents";
import LinkButton from "../layouts/LinkButton";

export default function Home() {
  return (
    <>
      <h1>Bienvenue au Centre Équestre du Domaine de Lipica !</h1>
      <main className="px-4">
        <p>
          Situé à Ozoir la Ferrière (77), à seulement 25 km à l&apos;est de
          Paris, notre centre offre une gamme complète d&apos;activités
          équestres, allant du Poney Club à plusieurs écuries de propriétaires.
          Toutes les disciplines équestres, de l&apos;initiation à la
          compétition, sont enseignées par des moniteurs expérimentés. Nous
          proposons également la vente et la location de poneys et chevaux.
        </p>
        <img src="/img1.jpg" alt="" />
        <p>
          Idéalement situé à proximité de la forêt domaniale
          d&apos;Armainvilliers et des principales voies de circulation, le
          Domaine de Lipica offre un équilibre parfait entre la tranquillité de
          la nature et la facilité d&apos;accès depuis Paris.
        </p>
        <img src="img2.jpg" alt="" />
        <p>
          Pour les passionnés de compétition, notre centre offre un accès
          exclusif à des événements équestres, des stages de perfectionnement,
          et l&apos;organisation de manifestations.
        </p>
        <p>
          Venez découvrir l&apos;équitation dans un cadre exceptionnel, où la
          passion des chevaux rencontre l&apos;excellence équestre.
        </p>
      </main>

      <NextEvents />

      <section className="home-section blue-gradient">
        <h2>Listes de départ et résultats</h2>
        <p className="text-center mb-4">
          Retrouvez les listes de départ et les résultats de tous les concours
          organisés au domaine de Lipica
        </p>
        <LinkButton link="" label="Voir les engagés et les résultats" />
      </section>
    </>
  );
}