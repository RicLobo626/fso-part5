import { createBlog, getBlogs } from "../../services/blogs";
import { useState, useEffect } from "react";
import { TheHeader, BlogFormSection, BlogsSection } from "..";
import { handleError } from "../../helpers/errorHelper";

export const UserView = ({ user, onLogout, showError, showSuccess }) => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleCreateBlog = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData);

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

  return (
    <main>
      <TheHeader user={user} onLogout={onLogout} />

      <BlogFormSection onCreateBlog={handleCreateBlog} />

      <BlogsSection blogs={blogs} isLoading={isLoading} />
    </main>
  );
};
