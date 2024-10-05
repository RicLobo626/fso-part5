import { useState } from "react";
import { Button } from "@/components";
import { useAuth } from "@/contexts";
import PropTypes from "prop-types";

export const Blog = ({ onLike, onDelete, blog }) => {
  const { user } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);

  const isCreator = blog.user.username === user.username;

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleDelete = () => {
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
      onDelete(blog.id);
    }
  };

  const handleLike = () => onLike(blog.id);

  return (
    <li className="blog">
      <header className="blog-header">
        <h3 className="blog-title">
          {blog.title} - {blog.author}
        </h3>

        <Button
          onClick={handleToggle}
          text={isExpanded ? "Hide" : "View"}
          aria-expanded={isExpanded}
          aria-controls={`blog-${blog.id}-details`}
        />
      </header>

      {isExpanded && (
        <div id={`blog-${blog.id}-details`}>
          <p>{blog.url}</p>
          <p>
            {blog.likes} likes <Button onClick={handleLike} text="Like" />
          </p>
          <p>{blog.user.name}</p>
          {isCreator && <Button onClick={handleDelete} text="Delete" />}
        </div>
      )}
    </li>
  );
};

Blog.propTypes = {
  onLike: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
};