import { TheHeader } from "@/components";
import { useAuth } from "@/contexts";
import { AuthView, LoginView } from "@/views";
import { Route, Routes } from "react-router-dom";

const App = () => {
  const { user } = useAuth();

  return (
    <>
      <TheHeader />

      <main>
        <Routes>
          <Route path="/*" element={user ? <AuthView /> : <LoginView />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
