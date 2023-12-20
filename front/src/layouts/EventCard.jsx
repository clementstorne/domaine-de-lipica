import PropTypes from "prop-types";
import DisciplineTag from "./DisciplineTag";
import LinkButton from "./LinkButton";

export default function EventCard(props) {
  return (
    <div className="event-card">
      <DisciplineTag name={props.discipline} />
      <h3>{props.niveau}</h3>
      <h4>
        {props.debut === props.fin
          ? `le ${props.debut}`
          : `du ${props.debut} au ${props.fin}`}
      </h4>
      <LinkButton link="" label="Détails" />
    </div>
  );
}

EventCard.propTypes = {
  debut: PropTypes.string.isRequired,
  fin: PropTypes.string.isRequired,
  discipline: PropTypes.string.isRequired,
  niveau: PropTypes.string.isRequired,
};
