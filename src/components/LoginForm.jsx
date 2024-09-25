export const LoginForm = ({ onLogin }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData);

    onLogin(values);
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

      <button type="submit">Login</button>
    </form>
  );
};
