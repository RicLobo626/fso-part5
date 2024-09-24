import { useState, useEffect } from "react";
import { getBlogs } from "./services/blogs";
import { LoginForm, Blogs } from "./components";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getAndSetBlogs = async () => {
      const blogs = await getBlogs();
      setBlogs(blogs);
    };

    getAndSetBlogs();
  }, []);

  return (
    <main>
      {!user && <LoginForm />}

      {user && (
        <section>
          <h2>blogs</h2>
          <Blogs blogs={blogs} />
        </section>
      )}
    </main>
  );
};

export default App;
