import { useNotification } from "@/contexts/NotificationContext";

export const Notification = () => {
  const { notification } = useNotification();

  if (!notification) return null;

  return (
    <div
      className={`notification notification--${notification.style}`}
      role="notification"
      aria-live="assertive"
      aria-atomic="true"
    >
      {notification.message}
    </div>
  );
};
