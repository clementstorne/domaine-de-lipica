import Navbar from "../layouts/Navbar";
import FormConcours from "../components/FormConcours";
import Footer from "../layouts/Footer";

export default function AdminConcoursCreate() {
  return (
    <>
      <Navbar />
      <h1>Ajouter un concours</h1>

      <main className="flex flex-col items-center px-4 md:px-0">
        <FormConcours type="create" />
      </main>

      <Footer />
    </>
  );
}
