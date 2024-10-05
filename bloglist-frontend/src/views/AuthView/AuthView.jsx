import { Route, Routes } from "react-router-dom";
import { HomeView, UsersView } from "@/views";

export const AuthView = () => {
  return (
    <Routes>
      <Route path="/*" element={<HomeView />} />
      <Route path="/users/*" element={<UsersView />} />
    </Routes>
  );
};
