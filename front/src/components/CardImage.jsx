import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { deleteImage } from "../store/carouselSlice";

import { FaPen, FaTrash } from "react-icons/fa6";
import { Button, LinkButton } from "./index";

export default function CardImage(props) {
  const dispatch = useDispatch();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const md = 768;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleDeleteClick = () => {
    dispatch(deleteImage({ id: props.id }));
  };

  return (
    <div
      className={`${props.className} mb-4 flex w-full flex-col flex-nowrap items-center justify-between gap-4 p-4
    md:mb-0 md:grid md:h-48 md:grid-cols-4`}
    >
      <img
        src={props.url}
        alt={props.alt}
        className="self-center object-fill aspect-auto justify-self-center sm:w-3/4 md:w-full"
      />
      <p className="font-bold text-center">{props.title}</p>
      <p className="text-center">{props.alt}</p>
      <div className="flex flex-row items-center justify-center flex-nowrap">
        <LinkButton
          link={"/administration/carousel/" + props.id}
          label={windowWidth >= md ? <FaPen /> : "Modifier"}
          size="small"
          className="mr-4"
        />
        <Button
          onClick={handleDeleteClick}
          label={windowWidth >= md ? <FaTrash /> : "Supprimer"}
          size="small"
          className="mr-4"
        />
      </div>
    </div>
  );
}

CardImage.propTypes = {
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
};
