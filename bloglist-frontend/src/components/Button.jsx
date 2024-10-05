import PropTypes from "prop-types";

export const Button = ({ text, ...props }) => {
  return <button {...props}>{text}</button>;
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
};
