import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getAllStables } from "../store/stableSlice";

import { Footer, LinkButton, Navbar } from "../components/index";

export default function SiteMap() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllStables());
  }, []);

  const stables = useSelector((state) => state.stables.stablesList);
  const error = useSelector((state) => state.stables.error);
  const isLoading = useSelector((state) => state.stables.isLoading);

  return (
    <>
      <Navbar />
      <h1>Plan du site</h1>

      <main className="mx-auto flex max-w-288 flex-col justify-between lg:flex-row">
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

        {!isLoading && !error && (
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
          </section>
        )}

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
