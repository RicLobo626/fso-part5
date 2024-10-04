import { useState, useEffect } from "react";
import { LoginForm, TheHeader, UserView } from "@/components";
import { login } from "@/services/login";
import { handleError } from "@/helpers/errorHelper";
import { useNotification } from "./contexts/NotificationContext";

const App = () => {
  const [user, setUser] = useState(null);
  const { showSuccess, showError } = useNotification();

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
      showSuccess("Login successful");
      setUser(data);
    } catch (e) {
      const { message } = handleError(e);
      showError(message);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  };

  return (
    <>
      <TheHeader onLogout={handleLogout} user={user} />

      {!user && <LoginForm onLogin={handleLogin} />}

      {user && <UserView user={user} onLogout={handleLogout} />}
    </>
  );
};

export default App;
