import PropTypes from "prop-types";

import { DISCIPLINES } from "../utils/disciplineUtils";

export default function DisciplineTag(props) {
  const discipline = DISCIPLINES.filter(
    (discipline) => discipline.code === props.name,
  )[0];

  return (
    <div
      className="discipline-tag"
      style={{ backgroundColor: discipline.color, color: discipline.textColor }}
    >
      {discipline.name}
    </div>
  );
}

DisciplineTag.propTypes = {
  name: PropTypes.oneOf([
    "cso",
    "hunter",
    "cce",
    "dressage",
    "attelage",
    "voltige",
    "endurance",
    "western",
    "horseball",
    "ponygames",
    "trec",
    "equifeel",
    "equifun",
    "ridebike",
    "riderun",
    "tiralarc",
  ]),
};
