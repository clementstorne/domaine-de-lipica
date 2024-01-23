import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { deleteImage } from "../store/carouselSlice";

import { FaPen, FaTrash } from "react-icons/fa6";
import { Button, LinkButton } from "./index";

export default function CardImage(props) {
  const dispatch = useDispatch();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const lg = 1024;
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
    <div className={`${props.className} image-card`}>
      {/* <p className="text-center">1</p> */}
      <img
        src={props.url}
        alt={props.alt}
        className="self-center object-fill max-w-full max-h-full justify-self-center"
      />
      <p className="font-bold text-center">{props.title}</p>
      <p className="text-center">{props.alt}</p>
      <div className="flex flex-row items-center justify-center flex-nowrap">
        <LinkButton
          link={"/administration/carousel/" + props.id}
          label={windowWidth > md && windowWidth < lg ? <FaPen /> : "Modifier"}
          size="small"
          className="mr-4"
        />
        <Button
          onClick={handleDeleteClick}
          label={
            windowWidth > md && windowWidth < lg ? <FaTrash /> : "Supprimer"
          }
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
