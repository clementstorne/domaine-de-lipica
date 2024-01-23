import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleImage } from "../store/carouselSlice";

import { FormCarousel } from "../components/index";
import { ErrorPage } from "./index";

export default function AdminConcoursUpdate() {
  const dispatch = useDispatch();
  const { imageId } = useParams();

  useEffect(() => {
    dispatch(getSingleImage({ id: imageId }));
  }, []);

  const image = useSelector((state) => state.carousel.image);
  const error = useSelector((state) => state.carousel.error);
  const isLoading = useSelector((state) => state.carousel.isLoading);

  if (error) {
    return <ErrorPage />;
  }
  return (
    <>
      <h1>Modifier une image</h1>

      <main className="flex flex-col items-center px-4 md:px-0">
        {!isLoading && image && <FormCarousel type="update" image={image} />}
      </main>
    </>
  );
}
