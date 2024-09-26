import { getBlogs } from "../../services/blogs";
import { useState, useEffect } from "react";
import { Blogs, TheHeader } from "..";

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

  return (
    <>
      <TheHeader user={user} onLogout={onLogout} />

      <section>
        <h2>All blogs</h2>
        <Blogs blogs={blogs} isLoading={isLoading} />
      </section>
    </>
  );
};
