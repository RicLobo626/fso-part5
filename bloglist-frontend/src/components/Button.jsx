import PropTypes from "prop-types";
import { Button as HUIButton } from "@headlessui/react";

export const Button = ({ text, className, ...props }) => {
  return (
    <HUIButton {...props} className={`btn ${className}`}>
      {text}
    </HUIButton>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
};
