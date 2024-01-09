import PropTypes from "prop-types";

import { useEffect, useState } from "react";
import { eventDates, isInFuture } from "../utils/dateUtils";

import { useDispatch } from "react-redux";
import { deleteEvent } from "../store/eventSlice";

import { FaTrash, FaPen } from "react-icons/fa6";

import DisciplineTag from "../layouts/DisciplineTag";
import Button from "../layouts/Button";
import LinkButton from "../layouts/LinkButton";

export default function CardEvent(props) {
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

  const handleDeleteClick = () => dispatch(deleteEvent({ id: props.id }));
  // const handleDeleteClick = async () => {
  //   await EventService.deleteEvent(props.id);
  // };

  return (
    <div className={`${props.className} event-card`}>
      <p className="text-center">{eventDates(props.debut, props.fin)}</p>
      <div className="md:flex md:flex-row md:flex-nowrap md:items-center md:justify-center">
        <DisciplineTag name={props.discipline} />
      </div>
      <p className="text-center">{props.niveau}</p>
      <div className="flex flex-row flex-nowrap items-center justify-center">
        {props.admin ? (
          <>
            <LinkButton
              link={"/administration/concours/" + props.id}
              label={
                windowWidth > md && windowWidth < lg ? <FaPen /> : "Modifier"
              }
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
          </>
        ) : (
          <>
            {isInFuture(props.debut) && (
              <LinkButton
                link={"/concours/" + props.id}
                label="Horaires"
                size="small"
                disabled={props.horaires === ""}
                className="mr-4"
              />
            )}

            <LinkButton
              link={props.lienWinJump}
              label={`${isInFuture(props.debut) ? "Live" : "Résultats"}`}
              size="small"
              disabled={props.lienWinJump === ""}
            />
          </>
        )}
      </div>
    </div>
  );
}

CardEvent.propTypes = {
  id: PropTypes.string.isRequired,
  debut: PropTypes.string.isRequired,
  fin: PropTypes.string.isRequired,
  discipline: PropTypes.string.isRequired,
  niveau: PropTypes.string.isRequired,
  horaires: PropTypes.string,
  lienWinJump: PropTypes.string,
  className: PropTypes.string,
  admin: PropTypes.bool,
};
