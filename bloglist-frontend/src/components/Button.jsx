import PropTypes from "prop-types";
import { Button as HUIButton } from "@headlessui/react";

export const Button = ({ text, className, ...props }) => {
  const defaultClassName =
    "bg-slate-200 border-slate-300 data-[hover]:bg-slate-300 border-2 rounded px-2";

  return (
    <HUIButton {...props} className={`${defaultClassName} ${className}`}>
      {text}
    </HUIButton>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
};
