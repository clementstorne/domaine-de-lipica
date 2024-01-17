import { Footer, FormContact, Navbar } from "../components/index";

export default function Contact() {
  return (
    <>
      <Navbar />
      <h1>Contact</h1>

      <section className="flex flex-col items-center px-4 text-center md:px-0">
        <h2 className="text-blue-900">Nos coordonnées</h2>

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2629.7378841376913!2d2.65571291199896!3d48.76780167120043!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e6067616a76f11%3A0x2f71376656ba1dba!2sDomaine%20de%20Lipica!5e0!3m2!1sfr!2sfr!4v1703759070377!5m2!1sfr!2sfr"
          className="h-112 w-full max-w-144"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <p className="my-4">
          Domaine de Lipica <br />
          Avenue du Prix du Jockey Club <br />
          77330 OZOIR-LA-FERRIÈRE
        </p>
        <p>
          GPS <br /> 48°45&apos;57.00&quot; N <br /> 2°39&apos;39.95&quot; E
        </p>
      </section>

      <main className="flex flex-col items-center px-4 md:px-0">
        <h2 className="text-blue-900">Contactez-nous</h2>
        <FormContact />
      </main>

      <Footer />
    </>
  );
}
