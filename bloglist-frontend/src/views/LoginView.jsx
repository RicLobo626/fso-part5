import { Button } from "@/components";
import { useAuth } from "@/contexts";

export const LoginView = () => {
  const { loginUser } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData);

    loginUser(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="username" />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
      </div>

      <Button type="submit" text="Login" className="btn-slate" />
    </form>
  );
};
