import PropTypes from "prop-types";

import DisciplineTag from "../layouts/DisciplineTag";
import Button from "../layouts/Button";
import LinkButton from "../layouts/LinkButton";

import { eventDates, isInFuture } from "../utils/dateUtils";
import EventService from "../services/EventService";

export default function CardEvent(props) {
  const handleDeleteClick = async () => {
    await EventService.deleteEvent(props.id);
  };

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
              label="Modifier"
              size="small"
              className="mr-4"
            />
            <Button
              onClick={handleDeleteClick}
              label="Supprimer"
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
