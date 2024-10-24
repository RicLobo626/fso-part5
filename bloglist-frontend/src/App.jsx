import { useState, useEffect } from "react";
import { AlertBar, LoginForm, TheHeader, UserView } from "@/components";
import { login } from "@/services/login";
import { handleError } from "@/helpers/errorHelper";

const App = () => {
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");

    if (loggedUserJSON) {
      setUser(JSON.parse(loggedUserJSON));
    }
  }, []);

  const showSuccess = (message) => setAlert({ message, type: "success" });
  const showError = (message) => setAlert({ message, type: "error" });
  const handleCloseAlert = () => setAlert(null);

  const handleAndShowError = (e) => {
    const { message } = handleError(e);
    showError(message);
  };

  const handleLogin = async (values) => {
    try {
      const data = await login(values);
      window.localStorage.setItem("loggedUser", JSON.stringify(data));
      showSuccess("Login successful");
      setUser(data);
    } catch (e) {
      handleAndShowError(e);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  };

  return (
    <>
      <AlertBar alert={alert} onClose={handleCloseAlert} />

      <TheHeader onLogout={handleLogout} user={user} />

      {!user && <LoginForm onLogin={handleLogin} />}

      {user && (
        <UserView
          user={user}
          onLogout={handleLogout}
          onError={handleAndShowError}
          onSuccess={showSuccess}
        />
      )}
    </>
  );
};

export default App;
