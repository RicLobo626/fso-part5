import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export const Users = () => {
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    refetchOnMount: false,
  });

  if (isLoading) {
    return <p>Loading users...</p>;
  }

  return (
    <table>
      <thead>
        <tr align="left">
          <th>Name</th>
          <th>Blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};