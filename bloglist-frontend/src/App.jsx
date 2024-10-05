import { LoginForm, TheHeader, UserView } from "@/components";
import { useAuth } from "@/contexts";

const App = () => {
  const { user } = useAuth();

  return (
    <>
      <TheHeader />

      {!user && <LoginForm />}

      {user && <UserView />}
    </>
  );
};

export default App;
