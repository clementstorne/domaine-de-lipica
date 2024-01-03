import partners from "../data/partenaires.json";

import Navbar from "../layouts/Navbar";
import CardPartner from "../components/CardPartenaire";
import Footer from "../layouts/Footer";

export default function AdminPartenaires() {
  return (
    <>
      <Navbar />
      <h1>Liste des partenaires</h1>
      <section className="mb-8 flex flex-col flex-wrap items-center justify-center md:mb-16 md:flex-row md:items-stretch">
        {partners.map((partner) => (
          <CardPartner key={partner.id} {...partner} admin={true} />
        ))}
      </section>
      <Footer />
    </>
  );
}
