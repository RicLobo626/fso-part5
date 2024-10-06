import { Input as HUInput } from "@headlessui/react";
import PropTypes from "prop-types";

export const Field = ({ className = "", label, id, type = "text", ...props }) => {
  return (
    <div className={`mb-2 ${className}`}>
      <label htmlFor={id} className="block">
        {label}
      </label>

      <HUInput type={type} id={id} className="field" {...props} />
    </div>
  );
};

Field.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};
