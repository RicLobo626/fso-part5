import { Textarea as HUITextarea } from "@headlessui/react";
import PropTypes from "prop-types";

export const Textarea = ({ className = "", label, id, type = "text", ...props }) => {
  return (
    <div className={`mb-2 ${className}`}>
      <label htmlFor={id} className="block">
        {label}
      </label>

      <HUITextarea type={type} id={id} className="field" {...props} />
    </div>
  );
};

Textarea.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
