import stables from "../data/ecuries.json";

import Navbar from "../layouts/Navbar";
import Carousel from "../layouts/Carousel";
import Footer from "../layouts/Footer";

const images = [
  {
    id: 0,
    src: "/img1.jpg",
    alt: "Entrée du grand manège du domaine de Lipica",
    legend: "Entrée du grand manège",
  },
  {
    id: 1,
    src: "/img2.jpg",
    alt: "Le grand manège du domaine de Lipica lors d'une copétition de CSO indoor",
    legend: "Grand manège",
  },
  {
    id: 2,
    src: "/img3.jpg",
    alt: "Le grand manège du domaine de Lipica lors d'une copétition de CSO indoor",
    legend: "Grand manège",
  },
  {
    id: 3,
    src: "/img4.jpg",
    alt: "Le manège de détente du domaine de Lipica lors d'une copétition de CSO indoor",
    legend: "Manège de détente",
  },
  {
    id: 4,
    src: "/img5.jpg",
    alt: "Le manège de détente du domaine de Lipica lors d'une copétition de CSO indoor",
    legend: "Manège de détente",
  },
  {
    id: 5,
    src: "/img6.jpg",
    alt: "La grande carrière du domaine de Lipica lors d'une copétition de CSO outdoor",
    legend: "Carrière principale",
  },
  {
    id: 6,
    src: "/img7.jpg",
    alt: "La deuxième carrière du domaine de Lipica lors d'une copétition de CSO outdoor",
    legend: "Carrière de compétition",
  },
  {
    id: 7,
    src: "/img8.jpg",
    alt: "Une carrière de détente du domaine de Lipica lors d'une copétition de CSO outdoor",
    legend: "Carrière de détente",
  },
];

export default function Ecurie() {
  const stableUrl = window.location.pathname.split("/")[1];
  const stable = stables.filter((stable) => stable.url === stableUrl)[0];

  return (
    <>
      <Navbar />
      <h1>{stable.nom}</h1>

      <section className="mb-8 md:mb-16">
        <p className="mb-4">{stable.informations}</p>
        <div className="mx-auto md:w-3/4 lg:w-1/2">
          <Carousel images={images} />
        </div>
      </section>

      <Footer />
    </>
  );
}
