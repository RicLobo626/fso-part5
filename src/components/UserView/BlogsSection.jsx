import { useState } from "react";
import { Button } from "../Button";

const Blog = ({ blog }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <li className="blog">
      <header className="blog-header">
        <h3 className="blog-title">
          {blog.title} - {blog.author}
        </h3>

        <Button
          text={isExpanded ? "Hide" : "View"}
          onClick={handleToggle}
          aria-expanded={isExpanded}
          aria-controls={`blog-${blog.id}-details`}
        />
      </header>

      {isExpanded && (
        <div id={`blog-${blog.id}-details`}>
          <p>{blog.url}</p>
          <p>
            {blog.likes} likes <Button text="Like" />
          </p>
          <p>{blog.user.name}</p>
        </div>
      )}
    </li>
  );
};

const Blogs = ({ blogs, isLoading }) => {
  if (isLoading) {
    return <p>Loading blogs...</p>;
  }

  if (blogs.length === 0) {
    return <p>No blogs </p>;
  }

  return (
    <ul className="blogs">
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </ul>
  );
};

export const BlogsSection = ({ blogs, isLoading }) => {
  return (
    <section>
      <h2>All blogs</h2>
      <Blogs blogs={blogs} isLoading={isLoading} />
    </section>
  );
};
