import { Link as RouterLink } from "react-router-dom";

export const Link = ({ text, ...props }) => {
  return (
    <RouterLink className="link" {...props}>
      {props.children || text}
    </RouterLink>
  );
};
