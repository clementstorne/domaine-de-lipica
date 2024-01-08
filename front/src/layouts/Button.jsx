import PropTypes from "prop-types";

export default function Button(props) {
  return (
    <>
      {props.disabled ? (
        <button
          disabled
          aria-disabled="true"
          className={`${props.className} button disabled ${
            props.size === "small" ? "small-button" : "big-button"
          }`}
        >
          {props.label}
        </button>
      ) : (
        <button
          onClick={props.onClick}
          className={`${props.className} button ${
            props.size === "small" ? "small-button" : "big-button"
          }`}
        >
          {props.label}
        </button>
      )}
    </>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(["small"]),
};
