import { useState } from "react";
import { Button } from "@/components";
import { Link } from "react-router-dom";
import { BlogDetails } from "@/components/BlogDetails";
import PropTypes from "prop-types";

export const Blog = ({ onLike, onDelete, blog }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <li className="blog">
      <header className="blog-header">
        <h3 className="blog-title">
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} - {blog.author}
          </Link>
        </h3>

        <Button
          onClick={handleToggle}
          text={isExpanded ? "Hide" : "View"}
          aria-expanded={isExpanded}
          aria-controls={`blog-${blog.id}-details`}
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
