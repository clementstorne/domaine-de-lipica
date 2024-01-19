import { FormEcurie } from "../components/index";

export default function AdminEcurieCreate() {
  return (
    <>
      <h1>Ajouter une écurie</h1>

      <main className="flex flex-col items-center px-4 md:px-0">
        <FormEcurie type="create" />
      </main>
    </>
  );
}
