import Navbar from "../layouts/Navbar";
import FormPartenaires from "../components/FormPartenaire";
import Footer from "../layouts/Footer";

export default function AdminPartenaireCreate() {
  return (
    <>
      <Navbar />
      <h1>Ajouter un partenaire</h1>

      <main className="flex flex-col items-center px-4 md:px-0">
        <FormPartenaires type="create" />
      </main>

      <Footer />
    </>
  );
}
