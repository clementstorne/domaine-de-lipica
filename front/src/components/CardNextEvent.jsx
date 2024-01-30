import PropTypes from "prop-types";

import { DisciplineTag } from "./index";

import { eventDates } from "../utils/dateUtils";

export default function CardNextEvent(props) {
  return (
    <div className="flex flex-col items-center justify-between w-3/4 p-4 rounded-5 h-52 flex-nowrap bg-gray-50 text-gray-950 drop-shadow-base sm:max-w-80 md:h-80 md:p-8">
      <DisciplineTag name={props.discipline} />
      <h3>{props.niveau}</h3>
      <h4>{eventDates(props.debut, props.fin)}</h4>
    </div>
  );
}

CardNextEvent.propTypes = {
  debut: PropTypes.string.isRequired,
  fin: PropTypes.string.isRequired,
  discipline: PropTypes.string.isRequired,
  niveau: PropTypes.string.isRequired,
};
