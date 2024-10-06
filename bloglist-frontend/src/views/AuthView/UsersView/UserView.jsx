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

  console.log(users);
  const user = match && users.find(({ id }) => id === match.params.id);

  return (
    <section className="section">
      <h2 className="text-2xl mb-4">{user.name}&apos;s blogs</h2>

      <BlogList blogs={user.blogs} />
    </section>
  );
};
