import { Button } from "@/components";

export const TheHeader = ({ user, onLogout }) => {
  return (
    <header>
      <h1>Bloglist</h1>

      {user && (
        <p>
          Welcome, {user.name}!
          <Button onClick={onLogout} text="Logout" />
        </p>
      )}
    </header>
  );
};
