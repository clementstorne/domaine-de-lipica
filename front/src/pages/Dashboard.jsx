import Navbar from "../layouts/Navbar";
import LinkButton from "../layouts/LinkButton";
import Footer from "../layouts/Footer";

export default function Dahsboard() {
  return (
    <>
      <Navbar />
      <h1>Administration du site</h1>

      <main className="mx-auto flex max-w-288 flex-col justify-between px-8 lg:flex-row">
        <section className="mx-0 my-4">
          <h2 className="text-blue-900">Concours</h2>
          <nav className="flex flex-col items-center justify-between">
            <LinkButton
              link="/administration/concours/nouveau"
              label="Ajouter un concours"
              className="mb-2"
              size="small"
            />
            <LinkButton
              link="/administration/concours"
              label="Liste des concours"
              className="mb-2"
              size="small"
            />
          </nav>
        </section>

        <section className="mx-0 my-4">
          <h2 className="text-blue-900">Partenaires</h2>
          <nav className="flex flex-col items-center justify-between">
            <LinkButton
              link="/administration/partenaires/nouveau"
              label="Ajouter un partenaire"
              className="mb-2"
              size="small"
            />
            <LinkButton
              link="/administration/partenaires"
              label="Liste des partenaires"
              className="mb-2"
              size="small"
            />
          </nav>
        </section>

        <section className="mx-0 my-4">
          <h2 className="text-blue-900">Écuries</h2>
          <nav className="flex flex-col items-center justify-between">
            <LinkButton
              link="/administration/ecuries/nouveau"
              label="Ajouter une écurie"
              className="mb-2"
              size="small"
            />
            <LinkButton
              link="/administration/ecuries"
              label="Liste des écuries"
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
