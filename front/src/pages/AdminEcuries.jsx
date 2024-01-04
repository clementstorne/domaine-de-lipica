import stables from "../data/ecuries.json";

import Navbar from "../layouts/Navbar";
import CardEcurie from "../components/CardEcurie";
import Footer from "../layouts/Footer";

export default function AdminEcuries() {
  return (
    <>
      <Navbar />
      <h1>Liste des écuries</h1>
      <section className="mb-8 flex flex-col flex-wrap items-center justify-center md:mb-16 md:flex-row md:items-stretch">
        {stables.map((partner) => (
          <CardEcurie key={partner.id} {...partner} />
        ))}
      </section>
      <Footer />
    </>
  );
}
