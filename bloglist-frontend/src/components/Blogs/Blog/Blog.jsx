import { useState } from "react";
import { Button } from "@/components";
import { Link } from "@/components";
import { BlogDetails } from "@/components/BlogDetails";
import PropTypes from "prop-types";

export const Blog = ({ onLike, onDelete, blog }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <li className="border-2 rounded p-3 mb-2">
      <header className="flex justify-between">
        <h3>
          <Link to={`/blogs/${blog.id}`} text={`${blog.title} - ${blog.author}`} />
        </h3>

        <Button
          onClick={handleToggle}
          text={isExpanded ? "Hide" : "View"}
          aria-expanded={isExpanded}
          aria-controls={`blog-${blog.id}-details`}
          className="btn-slate"
        />
      </header>

      {isExpanded && <BlogDetails onLike={onLike} onDelete={onDelete} blog={blog} />}
    </li>
  );
};

Blog.propTypes = {
  onLike: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
};
