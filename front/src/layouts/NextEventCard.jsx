import PropTypes from "prop-types";
import DisciplineTag from "./DisciplineTag";

import { eventDates } from "../utils/dateUtils";

export default function NextEventCard(props) {
  return (
    <div className="next-event-card">
      <DisciplineTag name={props.discipline} />
      <h3>{props.niveau}</h3>
      <h4>{eventDates(props.debut, props.fin)}</h4>
    </div>
  );
}

NextEventCard.propTypes = {
  debut: PropTypes.string.isRequired,
  fin: PropTypes.string.isRequired,
  discipline: PropTypes.string.isRequired,
  niveau: PropTypes.string.isRequired,
};
