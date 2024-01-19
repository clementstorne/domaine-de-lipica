import { FormConcours } from "../components/index";

export default function AdminConcoursCreate() {
  return (
    <>
      <h1>Ajouter un concours</h1>

      <main className="flex flex-col items-center px-4 md:px-0">
        <FormConcours type="create" />
      </main>
    </>
  );
}
