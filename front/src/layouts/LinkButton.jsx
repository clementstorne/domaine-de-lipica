import PropTypes from "prop-types";

import { Link } from "react-router-dom";

export default function LinkButton(props) {
  const isTheLinkExternal = props.link.split("/")[0] === ("https:" || "http:");
  return (
    <>
      {props.disabled ? (
        <a
          role="link"
          aria-disabled="true"
          className={`${props.className} button disabled ${
            props.size === "small" ? "small-button" : "big-button"
          }`}
        >
          {props.label}
        </a>
      ) : isTheLinkExternal ? (
        <a
          href={props.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`${props.className} button ${
            props.size === "small" ? "small-button" : "big-button"
          }`}
        >
          {props.label}
        </a>
      ) : (
        <Link
          className={`${props.className} button ${
            props.size === "small" ? "small-button" : "big-button"
          }`}
          to={props.link}
        >
          {props.label}
        </Link>
      )}
    </>
  );
}

LinkButton.propTypes = {
  link: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(["small"]),
};
