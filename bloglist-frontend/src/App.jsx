import { TheHeader } from "@/components";
import { HomeView, LoginView, UsersView } from "@/views";
import { useAuth } from "@/contexts";
import { Route, Routes } from "react-router-dom";

const App = () => {
  const { user } = useAuth();

  return (
    <>
      <TheHeader />

      <main>
        <Routes>
          <Route path="/" element={user ? <HomeView /> : <LoginView />} />
          <Route path="/users" element={<UsersView />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
