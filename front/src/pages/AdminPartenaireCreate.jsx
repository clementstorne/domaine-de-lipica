import { FormPartenaire } from "../components/index";

export default function AdminPartenaireCreate() {
  return (
    <>
      <h1>Ajouter un partenaire</h1>

      <main className="flex flex-col items-center px-4 md:px-0">
        <FormPartenaire type="create" />
      </main>
    </>
  );
}
