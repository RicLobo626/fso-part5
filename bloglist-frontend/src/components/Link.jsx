import { Link as RouterLink } from "react-router-dom";

export const Link = ({ text, ...props }) => {
  return (
    <RouterLink className="text-sky-500" {...props}>
      {props.children || text}
    </RouterLink>
  );
};
