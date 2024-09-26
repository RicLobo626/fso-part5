import { useState, useEffect } from "react";
import { AlertBar, LoginForm, UserView } from "./components";
import { login } from "./services/login";
import { handleError } from "./helpers/errorHelper";

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
      <AlertBar alert={alert} onClose={handleCloseAlert} />
      {!user && <LoginForm onLogin={handleLogin} />}
      {user && (
        <UserView
          user={user}
          onLogout={handleLogout}
          showError={showError}
          showSuccess={showSuccess}
        />
      )}
    </>
  );
};

export default App;
