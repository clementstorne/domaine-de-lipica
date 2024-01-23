import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getAllImages } from "../store/carouselSlice";

import { CardImage, LinkButton } from "../components/index";
import { ErrorPage } from "./index";

export default function AdminConcours() {
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
      <h1>Liste des images</h1>

      <div className="flex flex-col items-center justify-center mb-4 md:mb-16">
        <LinkButton
          link="/administration/carousel/nouveau"
          label="Ajouter une image"
          className="mb-2"
          size="small"
        />
      </div>

      {images.length === 0 ? (
        <></>
      ) : (
        <section className="mb-8 md:mb-16">
          <div className="table-header blue-gradient">
            <p>Aperçu</p>
            <p>Titre</p>
            <p>Description</p>
            <p>Actions</p>
          </div>
          {images.map((image, index) => (
            <CardImage
              key={image.id}
              id={image.id}
              url={image.url}
              alt={image.alt}
              title={image.title}
              className={`${index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"}`}
            />
          ))}
        </section>
      )}
      <div className="flex flex-col items-center justify-center mb-8 md:mb-16">
        <LinkButton
          link="/administration/dashboard/"
          label="Retour au dashboard"
          size="small"
        />
      </div>
    </>
  );
}
