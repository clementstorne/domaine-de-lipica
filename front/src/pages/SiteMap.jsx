import stables from "../data/ecuries.json";

import Navbar from "../layouts/Navbar";
import LinkButton from "../layouts/LinkButton";
import Footer from "../layouts/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <h1>Plan du site</h1>

      <main className="max-w-288 mx-auto flex flex-col justify-between lg:flex-row">
        <section className="mx-0 my-4 md:mx-4">
          <h2 className="text-blue-900">Domaine de Lipica</h2>
          <nav className="flex flex-col items-center justify-between">
            <LinkButton
              link="/"
              label="Accueil"
              className="mb-2"
              size="small"
            />
            <LinkButton
              link="/presentation"
              label="Présentation"
              className="mb-2"
              size="small"
            />
            <LinkButton
              link="/contact"
              label="Contact"
              className="mb-2"
              size="small"
            />
            <LinkButton
              link="/partenaires"
              label="Partenaires"
              className="mb-2"
              size="small"
            />
            <LinkButton
              link="/mentions-legales"
              label="Mentions légales"
              className="mb-2"
              size="small"
            />
          </nav>
        </section>

        <section className="mx-0 my-4 md:mx-4">
          <h2 className="text-blue-900">Centre équestre</h2>
          <nav className="flex flex-col items-center justify-between">
            {stables.map((stable) => (
              <LinkButton
                key={stable.id}
                link={`/${stable.url}`}
                label={stable.nom}
                className="mb-2"
                size="small"
              />
            ))}
          </nav>

          <ul className="flex flex-col items-center"></ul>
        </section>

        <section className="mx-0 my-4 md:mx-4">
          <h2 className="text-blue-900">Concours</h2>
          <nav className="flex flex-col items-center justify-between">
            <LinkButton
              link="/concours"
              label="Liste des concours"
              className="mb-2"
              size="small"
            />
            <LinkButton
              link="https://ozoir.winjump.fr/"
              label="Engagés et résultats"
              className="mb-2"
              size="small"
            />
          </nav>
        </section>
      </main>

      <Footer />
    </>
  );
}
