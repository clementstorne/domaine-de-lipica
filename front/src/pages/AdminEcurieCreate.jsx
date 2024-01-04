import Navbar from "../layouts/Navbar";
import FormEcurie from "../components/FormEcurie";
import Footer from "../layouts/Footer";

export default function AdminEcurieCreate() {
  return (
    <>
      <Navbar />
      <h1>Ajouter une écurie</h1>

      <main className="flex flex-col items-center px-4 md:px-0">
        <FormEcurie type="create" />
      </main>

      <Footer />
    </>
  );
}
