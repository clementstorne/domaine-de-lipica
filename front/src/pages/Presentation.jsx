import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getAllImages } from "../store/carouselSlice";

import { Carousel } from "../components/index";
import { ErrorPage } from "./index";

export default function Presentation() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllImages());
  }, []);

  const images = useSelector((state) => state.carousel.imagesList);
  const error = useSelector((state) => state.carousel.error);

  if (error) {
    return <ErrorPage />;
  }
  return (
    <>
      <h1>Présentation</h1>

      {images.length > 0 ? (
        <section className="mb-8 md:mb-16">
          <h2 className="text-blue-900">Installations</h2>
          <div className="mx-auto lg:w-19/12 md:w-3/4">
            <Carousel images={images} preview={true} />
          </div>
        </section>
      ) : (
        <></>
      )}

      <section className="mb-8 md:mb-16">
        <h2 className="text-blue-900">Plan</h2>
        <img src="/plan.png" alt="Plan de situation du domaine de Lipica" />
      </section>
    </>
  );
}
