import { Button } from "..";

export const TheHeader = ({ user, onLogout }) => {
  return (
    <header>
      <h1>Bloglist</h1>

      <p>Welcome, {user.name}!</p>

      <Button onClick={onLogout} text="Logout" />
    </header>
  );
};
