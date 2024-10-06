import { Button } from "@/components";
import { useAuth } from "@/contexts";
import { Link } from "@/components";

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

      {user && (
        <nav>
          <ul>
            {links.map((link) => (
              <li key={link.to}>
                <Link {...link} />
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};
