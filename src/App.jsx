import { useState, useEffect } from "react";
import { LoginForm, UserView } from "./components";
import { login } from "./services/login";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");

    if (loggedUserJSON) {
      setUser(JSON.parse(loggedUserJSON));
    }
  }, []);

  const handleLogin = async (values) => {
    try {
      const data = await login(values);
      window.localStorage.setItem("loggedUser", JSON.stringify(data));
      setUser(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  };

  return (
    <main>
      {!user && <LoginForm onLogin={handleLogin} />}
      {user && <UserView user={user} onLogout={handleLogout} />}
    </main>
  );
};

export default App;
