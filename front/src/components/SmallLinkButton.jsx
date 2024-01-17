import PropTypes from "prop-types";

import { Link } from "react-router-dom";

export default function LinkButton(props) {
  return (
    <Link className={`${props.className} button`} to={props.link}>
      {props.label}
    </Link>
  );
}

LinkButton.propTypes = {
  link: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
};
