import PropTypes from "prop-types";

export default function DisciplineTag(props) {
  const csoColor = "#732F7B";
  const dressageColor = "#043D79";
  const hunterColor = "#A95A1B";
  const voltigeColor = "#0D8DC7";

  let label = "";
  let color = "";

  switch (props.name) {
    case "cso":
      label = "CSO";
      color = csoColor;
      break;
    case "dressage":
      label = "Dressage";
      color = dressageColor;
      break;
    case "hunter":
      label = "Hunter";
      color = hunterColor;
      break;
    case "voltige":
      label = "Voltige";
      color = voltigeColor;
      break;
  }
  return (
    <div className="discipline-tag" style={{ backgroundColor: color }}>
      {label}
    </div>
  );
}

DisciplineTag.propTypes = {
  name: PropTypes.oneOf(["cso", "dressage", "hunter", "voltige"]),
};
