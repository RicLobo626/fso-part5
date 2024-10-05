import { Button } from "@/components";
import { useAuth } from "@/contexts";

export const TheHeader = () => {
  const { user, logoutUser } = useAuth();

  return (
    <header>
      <h1>Bloglist</h1>

      {user && (
        <p>
          Welcome, {user.name}!
          <Button onClick={logoutUser} text="Logout" />
        </p>
      )}
    </header>
  );
};
