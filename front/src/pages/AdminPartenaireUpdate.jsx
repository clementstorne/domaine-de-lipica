import partners from "../data/partenaires.json";

import Navbar from "../layouts/Navbar";
import FormPartenaire from "../components/FormPartenaire";
import Footer from "../layouts/Footer";

export default function AdminPartenaireUpdate() {
  const partnerId = window.location.pathname.split("partenaires/")[1];
  const partner = partners.filter(
    (event) => event.id === parseInt(partnerId),
  )[0];
  return (
    <>
      <Navbar />
      <h1>Modifier un Partenaire</h1>

      <main className="flex flex-col items-center px-4 md:px-0">
        <FormPartenaire type="update" partner={partner} />
      </main>

      <Footer />
    </>
  );
}
