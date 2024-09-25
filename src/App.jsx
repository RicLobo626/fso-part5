import { useState, useEffect } from "react";
import { getBlogs } from "./services/blogs";
import { login } from "./services/login";
import { LoginForm, Blogs } from "./components";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");

    if (loggedUserJSON) {
      setUser(JSON.parse(loggedUserJSON));
    }
  }, []);

  useEffect(() => {
    if (!user) {
      window.localStorage.removeItem("loggedUser");
      return;
    }

    window.localStorage.setItem("loggedUser", JSON.stringify(user));

    const getAndSetBlogs = async () => {
      try {
        const blogs = await getBlogs();
        setBlogs(blogs);
      } catch (e) {
        console.log(e);
      }
    };

    getAndSetBlogs();
  }, [user]);

  const handleLogin = async (values) => {
    try {
      const data = await login(values);
      setUser(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = () => setUser(null);

  return (
    <main>
      {!user && <LoginForm onLogin={handleLogin} />}

      {user && (
        <>
          <header>
            <h1>Bloglist</h1>

            <p>Welcome, {user.name}!</p>

            <button onClick={handleLogout}>Logout</button>
          </header>

          <section>
            <h2>blogs</h2>
            <Blogs blogs={blogs} />
          </section>
        </>
      )}
    </main>
  );
};

export default App;
