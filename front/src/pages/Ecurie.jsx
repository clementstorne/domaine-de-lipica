import stables from "../data/ecuries.json";

import Navbar from "../layouts/Navbar";
import Carousel from "../layouts/Carousel";
import Footer from "../layouts/Footer";

export default function Ecurie() {
  const stableUrl = window.location.pathname.split("/")[1];
  const stable = stables.filter((stable) => stable.url === stableUrl)[0];

  return (
    <>
      <Navbar />
      <h1>{stable.nom}</h1>

      <section className="mb-8 md:mb-16">
        <p className="mb-4">{stable.informations}</p>
        {stable.images && (
          <div className="mx-auto md:w-3/4 lg:w-1/2">
            <Carousel images={stable.images} />
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}
