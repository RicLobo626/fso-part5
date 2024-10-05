import { BlogList } from "@/components";
import { useQuery } from "@tanstack/react-query";
import { useMatch } from "react-router-dom";

export const UserView = () => {
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    refetchOnMount: false,
  });

  const match = useMatch("/users/:id");

  if (isLoading) {
    return <p>Loading user...</p>;
  }

  const user = match && users.find(({ id }) => id === match.params.id);

  return (
    <>
      <h2>{user.name}</h2>

      <section>
        <h3>Added blogs</h3>

        <BlogList blogs={user.blogs} />
      </section>
    </>
  );
};
