import { useEffect } from "react";
import PropTypes from "prop-types";

export const AlertBar = ({ onClose, alert }) => {
  useEffect(() => {
    const timeout = setTimeout(onClose, 4000);

    return () => clearTimeout(timeout);
  });

  if (!alert) return null;

  return (
    <div
      className={`alert alert--${alert.type}`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      {alert.message}
    </div>
  );
};

AlertBar.propTypes = {
  onClose: PropTypes.func.isRequired,
  alert: PropTypes.shape({
    type: PropTypes.oneOf(["success", "error"]).isRequired,
    message: PropTypes.string.isRequired,
  }),
};
