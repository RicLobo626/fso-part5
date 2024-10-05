import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBlog, likeBlog } from "@/services/blogs";
import { handleError } from "@/helpers/errorHelper";
import { Blog } from "@/components";
import { useNotification } from "@/contexts";

export const Blogs = () => {
  const { showSuccess, showError } = useNotification();

  const queryClient = useQueryClient();

  const { data: blogs, isLoading } = useQuery({
    queryKey: ["blogs"],
    refetchOnMount: false,
  });

  const likeMutation = useMutation({
    mutationFn: likeBlog,
    onSuccess: () => {
      showSuccess("Blog liked successfully");
    },
    onError: (e) => {
      const { message } = handleError(e);
      showError(message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      showSuccess("Blog deleted successfully");
      queryClient.invalidateQueries(["blogs"]);
    },
    onError: (e) => {
      const { message } = handleError(e);
      showError(message);
    },
  });

  const handleDelete = (id) => deleteMutation.mutate(id);

  const handleLike = (id) => {
    const blogs = queryClient.getQueryData(["blogs"]);
    const blogToUpdate = blogs.find((b) => b.id === id);
    blogToUpdate.likes += 1;
    likeMutation.mutate(id);
  };

  if (isLoading) {
    return <p>Loading blogs...</p>;
  }

  if (blogs.length === 0) {
    return <p>No blogs </p>;
  }

  return (
    <ul className="blogs">
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            onDelete={handleDelete}
            onLike={handleLike}
            blog={blog}
            key={blog.id}
          />
        ))}
    </ul>
  );
};
