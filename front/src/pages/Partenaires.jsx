import partners from "../data/partenaires.json";

import Navbar from "../layouts/Navbar";
import CardPartner from "../components/CardPartner";
import Footer from "../layouts/Footer";

export default function Partenaires() {
  console.log(partners);
  return (
    <>
      <Navbar />
      <h1>Partenaires</h1>
      <section className="mb-8 flex flex-col flex-wrap items-center justify-center md:mb-16 md:flex-row md:items-stretch">
        {partners.map((partner) => (
          <CardPartner key={partner.id} {...partner} />
        ))}
      </section>
      <Footer />
    </>
  );
}
