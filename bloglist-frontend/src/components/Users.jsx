import { useQuery } from "@tanstack/react-query";
import { Link } from "@/components";

export const Users = () => {
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    refetchOnMount: false,
  });

  if (isLoading) {
    return <p>Loading users...</p>;
  }

  return (
    <table className="border-2">
      <thead>
        <tr align="left" className="bg-slate-200">
          <th className="p-3 font-medium rounded">Name</th>
          <th className="p-3 font-medium">Blogs created</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td className="p-3 border-2">
              <Link to={`/users/${user.id}`} text={user.name} />
            </td>
            <td className="p-3 border-2" align="center">
              {user.blogs.length}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
