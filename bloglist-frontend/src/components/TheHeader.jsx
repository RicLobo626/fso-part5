import { Button } from "@/components";
import { useAuth } from "@/contexts";
import clsx from "clsx";
import { NavLink } from "react-router-dom";

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
    <header className="flex flex-wrap gap-3 bg-slate-300 p-3">
      <h1 className="text-2xl font-semibold mr-auto">Bloglist</h1>

      {user && (
        <p className="flex flex-wrap items-center align-bottom gap-2 ">
          Welcome, {user.name}!
          <Button onClick={logoutUser} text="Logout" className="btn-red" />
        </p>
      )}

      {user && (
        <nav className="basis-full">
          <ul className="flex gap-5">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    clsx("link", { "font-medium underline": isActive })
                  }
                >
                  {link.text}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};
