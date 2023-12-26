import PropTypes from "prop-types";

import DisciplineTag from "./DisciplineTag";
import LinkButton from "./LinkButton";

import { eventDates, isInFuture } from "../utils/dateUtils";

export default function EventCard(props) {
  return (
    <div className={`${props.className} event-card`}>
      <p className="text-center">{eventDates(props.debut, props.fin)}</p>
      <div className="md:flex md:flex-row md:flex-nowrap md:items-center md:justify-center">
        <DisciplineTag name={props.discipline} />
      </div>
      <p className="text-center">{props.niveau}</p>
      <div className="flex flex-row flex-nowrap items-center justify-center">
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
      </div>
    </div>
  );
}

EventCard.propTypes = {
  id: PropTypes.number.isRequired,
  debut: PropTypes.string.isRequired,
  fin: PropTypes.string.isRequired,
  discipline: PropTypes.string.isRequired,
  niveau: PropTypes.string.isRequired,
  horaires: PropTypes.string,
  lienWinJump: PropTypes.string,
  className: PropTypes.string,
};
