import { Notification } from "@/components";
import { createContext, useContext, useEffect, useReducer } from "react";

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationContextProvider = ({ children }) => {
  const reducer = (state, { type, payload: message }) => {
    switch (type) {
      case "SUCCESS":
        return { message, style: "success" };
      case "ERROR":
        return { message, style: "error" };
      case "REMOVE":
        return null;
      default:
        return state;
    }
  };

  const [notification, dispatch] = useReducer(reducer, null);

  const showSuccess = (message) => {
    dispatch({ type: "SUCCESS", payload: message });
  };

  const showError = (message) => {
    dispatch({ type: "ERROR", payload: message });
  };

  const removeNotification = () => {
    dispatch({ type: "REMOVE" });
  };

  useEffect(() => {
    if (!notification) return;

    const timerId = setTimeout(() => {
      removeNotification();
    }, 3000);

    return () => clearTimeout(timerId);
  }, [notification]);

  return (
    <NotificationContext.Provider
      value={{ notification, showSuccess, showError, removeNotification }}
    >
      <Notification />
      {children}
    </NotificationContext.Provider>
  );
};
