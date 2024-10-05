import { BlogDetails, Comments } from "@/components";
import { useNotification } from "@/contexts";
import { handleError } from "@/helpers/errorHelper";
import { deleteBlog, likeBlog } from "@/services/blogs";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMatch, useNavigate } from "react-router-dom";

export const BlogView = () => {
  const queryClient = useQueryClient();
  const { data: blogs, isLoading } = useQuery({
    queryKey: ["blogs"],
    refetchOnMount: false,
  });

  const navigate = useNavigate();
  const { showSuccess, showError } = useNotification();

  const likeMutation = useMutation({
    mutationFn: likeBlog,
    onSuccess: () => {
      showSuccess("Blog liked successfully");
      queryClient.invalidateQueries(["blogs"]);
    },
    onError: (e) => {
      const { message } = handleError(e);
      showError(message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      navigate("/");
      showSuccess("Blog deleted successfully");
      queryClient.invalidateQueries(["blogs"]);
    },
    onError: (e) => {
      const { message } = handleError(e);
      showError(message);
    },
  });

  const handleDelete = (id) => deleteMutation.mutate(id);

  const handleLike = (id) => likeMutation.mutate(id);

  const match = useMatch("/blogs/:id");

  if (isLoading) {
    return <p>Loading blog...</p>;
  }

  const blog = match && blogs.find(({ id }) => id === match.params.id);

  return (
    <>
      <section>
        <h2>
          {blog.title} - {blog.author}
        </h2>
        <BlogDetails onLike={handleLike} onDelete={handleDelete} blog={blog} />
      </section>

      <section>
        <h3>Comments</h3>
        <Comments comments={blog.comments} />
      </section>
    </>
  );
};
