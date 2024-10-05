import { createContext, useContext, useEffect, useReducer } from "react";
import { login } from "@/services/login";
import { useNotification } from "@/contexts";
import { handleError } from "@/helpers/errorHelper";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_USER":
      return payload;
    case "REMOVE_USER":
      return null;
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const { showSuccess, showError } = useNotification();
  const [user, dispatch] = useReducer(reducer, null);

  const setUser = (userData) => dispatch({ type: "SET_USER", payload: userData });
  const removeUser = () => dispatch({ type: "REMOVE_USER" });

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");

    if (loggedUserJSON) {
      setUser(JSON.parse(loggedUserJSON));
    }
  }, []);

  const loginUser = async (values) => {
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

  const logoutUser = async () => {
    window.localStorage.removeItem("loggedUser");
    removeUser();
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
