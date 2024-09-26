import { useState } from "react";
import { Button } from "../Button";

const Blog = ({ onLike, onDelete, blog, user }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const isCreator = blog.user.username === user.username;

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLike = () => onLike(blog.id);
  const handleDelete = () => {
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
      onDelete(blog.id);
    }
  };

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

const Blogs = ({ onLikeBlog, onDeleteBlog, isLoading, blogs, user }) => {
  if (isLoading) {
    return <p>Loading blogs...</p>;
  }

  if (blogs.length === 0) {
    return <p>No blogs </p>;
  }

  return (
    <ul className="blogs">
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            onLike={onLikeBlog}
            onDelete={onDeleteBlog}
            blog={blog}
            user={user}
            key={blog.id}
          />
        ))}
    </ul>
  );
};

export const BlogsSection = ({
  onLikeBlog,
  onDeleteBlog,
  isLoading,
  blogs,
  user,
}) => {
  return (
    <section>
      <h2>All blogs</h2>
      <Blogs
        blogs={blogs}
        isLoading={isLoading}
        onLikeBlog={onLikeBlog}
        onDeleteBlog={onDeleteBlog}
        user={user}
      />
    </section>
  );
};
