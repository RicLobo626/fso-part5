import { createBlog, deleteBlog, getBlogs, likeBlog } from "@/services/blogs";
import { useState, useEffect } from "react";
import { BlogFormSection, BlogsSection, Button } from "..";
import PropTypes from "prop-types";

export const UserView = ({ user, onError, onSuccess }) => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formIsVisible, setFormIsVisible] = useState(false);

  useEffect(() => {
    const getAndSetBlogs = async () => {
      try {
        setIsLoading(true);
        const blogs = await getBlogs();
        setBlogs(blogs);
      } catch (e) {
        onError(e);
      } finally {
        setIsLoading(false);
      }
    };

    getAndSetBlogs();
    // eslint-disable-next-line
  }, []);

  const handleCreateBlog = async (values, e) => {
    try {
      const blog = await createBlog(values);
      setBlogs(blogs.concat(blog));
      onSuccess("Blog created successfully");
      e.target.reset();
    } catch (e) {
      onError(e);
    }
  };

  const handleToggleForm = () => {
    setFormIsVisible(!formIsVisible);
  };

  const handleLikeBlog = async (id) => {
    try {
      setBlogs(blogs.map((b) => (b.id === id ? { ...b, likes: b.likes + 1 } : b)));
      await likeBlog(id);
    } catch (e) {
      onError(e);
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      await deleteBlog(id);
      setBlogs(blogs.filter((b) => b.id !== id));
      onSuccess("Blog deleted successfully");
    } catch (e) {
      onError(e);
    }
  };

  return (
    <main>
      <Button onClick={handleToggleForm} text="New blog" className={formIsVisible ? "hidden" : ""} />

      <BlogFormSection
        onCreateBlog={handleCreateBlog}
        onCancel={handleToggleForm}
        className={!formIsVisible ? "hidden" : ""}
      />

      <BlogsSection
        onLikeBlog={handleLikeBlog}
        onDeleteBlog={handleDeleteBlog}
        isLoading={isLoading}
        blogs={blogs}
        user={user}
      />
    </main>
  );
};

UserView.propTypes = {
  user: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};
