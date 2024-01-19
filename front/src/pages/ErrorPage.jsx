import { LinkButton } from "../components/index";

export default function ErrorPage() {
  return (
    <>
      <h1>Erreur 404</h1>
      <main className="flex h-[42vh] flex-col items-center px-4 md:px-0">
        <p className="paragraph text-center">
          La page que vous recherchez n&apos;existe pas.
        </p>
        <LinkButton
          link={"/"}
          label="Retour à la page d'accueil"
          className="mt-8"
        />
      </main>
    </>
  );
}
