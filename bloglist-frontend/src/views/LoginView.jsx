import { Button, Field } from "@/components";
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
      <Field label="Username" id="username" name="username" />

      <Field label="Password" id="password" name="password" type="password" />

      <Button type="submit" text="Login" className="btn-slate" />
    </form>
  );
};
