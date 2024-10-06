import PropTypes from "prop-types";
import { Button as HUIButton } from "@headlessui/react";

export const Button = ({ text, ...props }) => {
  return (
    <HUIButton
      {...props}
      className="bg-slate-200 border-slate-300 data-[hover]:bg-slate-300 border-2 rounded px-2"
    >
      {text}
    </HUIButton>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
};
