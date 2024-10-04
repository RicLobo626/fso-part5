import { createBlog, deleteBlog, getBlogs, likeBlog } from "@/services/blogs";
import { useState, useEffect } from "react";
import { BlogFormSection, BlogsSection, Button } from "..";
import { handleError } from "@/helpers/errorHelper";
import { useNotification } from "@/contexts/NotificationContext";
import PropTypes from "prop-types";

export const UserView = ({ user }) => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formIsVisible, setFormIsVisible] = useState(false);
  const { showSuccess, showError } = useNotification();

  useEffect(() => {
    const getAndSetBlogs = async () => {
      try {
        setIsLoading(true);
        const blogs = await getBlogs();
        setBlogs(blogs);
      } catch (e) {
        const { message } = handleError(e);
        showError(message);
      } finally {
        setIsLoading(false);
      }
    };

    getAndSetBlogs();
  }, []);

  const handleCreateBlog = async (values, e) => {
    try {
      const blog = await createBlog(values);
      setBlogs(blogs.concat(blog));
      showSuccess("Blog created successfully");
      e.target.reset();
    } catch (e) {
      const { message } = handleError(e);
      showError(message);
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
      const { message } = handleError(e);
      showError(message);
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      await deleteBlog(id);
      setBlogs(blogs.filter((b) => b.id !== id));
      showSuccess("Blog deleted successfully");
    } catch (e) {
      const { message } = handleError(e);
      showError(message);
    }
  };

  return (
    <main>
      <Button
        onClick={handleToggleForm}
        className={formIsVisible ? "hidden" : ""}
        text="New blog"
      />

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
};
