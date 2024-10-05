import { Route, Routes } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/services/users";
import { UserView } from "@/views";
import { Users } from "@/components";

export const UsersView = () => {
  useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return (
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="/:id" element={<UserView />} />;
    </Routes>
  );
};
