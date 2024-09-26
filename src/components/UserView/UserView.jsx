import { createBlog, getBlogs } from "../../services/blogs";
import { useState, useEffect } from "react";
import { Blogs, TheHeader, BlogForm } from "..";

export const UserView = ({ user, onLogout }) => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAndSetBlogs = async () => {
      try {
        setIsLoading(true);
        const blogs = await getBlogs();
        setBlogs(blogs);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };

    getAndSetBlogs();
  }, []);

  const handleSubmitBlog = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData);

    try {
      const blog = await createBlog(values);
      setBlogs(blogs.concat(blog));
      e.target.reset();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <TheHeader user={user} onLogout={onLogout} />

      <section>
        <h2>Create new</h2>
        <BlogForm onSubmit={handleSubmitBlog} />
      </section>

      <section>
        <h2>All blogs</h2>
        <Blogs blogs={blogs} isLoading={isLoading} />
      </section>
    </>
  );
};
