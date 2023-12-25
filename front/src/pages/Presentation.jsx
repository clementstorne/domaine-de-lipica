import Navbar from "../layouts/Navbar";
import Carousel from "../layouts/Carousel";
import Footer from "../layouts/Footer";

const images = [
  { src: "/img1.jpg", alt: "", legend: "Image 1" },
  { src: "/img2.jpg", alt: "", legend: "Image 2" },
  { src: "/img3.jpg", alt: "", legend: "Image 3" },
  { src: "/img4.jpg", alt: "", legend: "Image 4" },
  { src: "/img5.jpg", alt: "", legend: "Image 5" },
];

export default function Presentation() {
  return (
    <>
      <Navbar />
      <h1>Présentation</h1>

      <section className="mb-8 md:mb-16">
        <h2 className="text-blue-900">Installations</h2>
        <Carousel images={images} preview={true} />
      </section>

      <section className="mb-8 md:mb-16">
        <h2 className="text-blue-900">Plan</h2>
      </section>

      <Footer />
    </>
  );
}
