import { createBlog, getBlogs } from "../../services/blogs";
import { useState, useEffect } from "react";
import { TheHeader, BlogFormSection, BlogsSection, Button } from "..";
import { handleError } from "../../helpers/errorHelper";

export const UserView = ({ user, onLogout, showError, showSuccess }) => {
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

  return (
    <main>
      <TheHeader user={user} onLogout={onLogout} />

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

      <BlogsSection blogs={blogs} isLoading={isLoading} />
    </main>
  );
};
