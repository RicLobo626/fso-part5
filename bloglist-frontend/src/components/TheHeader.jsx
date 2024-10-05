import { Button } from "@/components";
import { useAuth } from "@/contexts";
import { Link } from "react-router-dom";

export const TheHeader = () => {
  const { user, logoutUser } = useAuth();

  const links = [
    {
      to: "/",
      text: "Home",
    },
    {
      to: "/users",
      text: "Users",
    },
  ];

  return (
    <header>
      <h1>Bloglist</h1>

      {user && (
        <p>
          Welcome, {user.name}!
          <Button onClick={logoutUser} text="Logout" />
        </p>
      )}

      <nav>
        <ul>
          {links.map((link) => (
            <li key={link.to}>
              <Link to={link.to}>{link.text}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
