import { createBlog, getBlogs, likeBlog } from "../../services/blogs";
import { useState, useEffect } from "react";
import { TheHeader, BlogFormSection, BlogsSection, Button } from "..";
import { handleError } from "../../helpers/errorHelper";

export const UserView = ({ user, onLogout, showError, showSuccess }) => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formIsVisible, setFormIsVisible] = useState(false);

  const handleAndShowError = (e) => {
    const { message } = handleError(e);
    showError(message);
  };

  useEffect(() => {
    const getAndSetBlogs = async () => {
      try {
        setIsLoading(true);
        const blogs = await getBlogs();
        setBlogs(blogs);
      } catch (e) {
        handleAndShowError(e);
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
      handleAndShowError(e);
    }
  };

  const handleToggleForm = () => {
    setFormIsVisible(!formIsVisible);
  };

  const handleLikeBlog = async (id) => {
    try {
      const blog = await likeBlog(id);
      setBlogs(blogs.map((b) => (b.id === id ? blog : b)));
    } catch (e) {
      handleAndShowError(e);
    }
  };

  return (
    <main>
      <TheHeader onLogout={onLogout} user={user} />

      <Button
        onClick={handleToggleForm}
        text="New blog"
        className={formIsVisible ? "hidden" : ""}
      />

      <BlogFormSection
        onCreateBlog={handleCreateBlog}
        onCancel={handleToggleForm}
        className={!formIsVisible ? "hidden" : ""}
      />

      <BlogsSection
        onLikeBlog={handleLikeBlog}
        blogs={blogs}
        isLoading={isLoading}
      />
    </main>
  );
};
