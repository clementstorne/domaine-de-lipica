import stables from "../data/ecuries.json";

import Navbar from "../layouts/Navbar";
import FormEcurie from "../components/FormEcurie";
import Footer from "../layouts/Footer";

export default function AdminEcurieUpdate() {
  const stableId = window.location.pathname.split("ecuries/")[1];
  const stable = stables.filter(
    (stable) => stable.id === parseInt(stableId),
  )[0];
  return (
    <>
      <Navbar />
      <h1>Ajouter une écurie</h1>

      <main className="flex flex-col items-center px-4 md:px-0">
        <FormEcurie type="create" stable={stable} />
      </main>

      <Footer />
    </>
  );
}
