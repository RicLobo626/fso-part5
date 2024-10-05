import { BlogForm } from "@/components";
import { useNotification } from "@/contexts/NotificationContext";
import { handleError } from "@/helpers/errorHelper";
import { createBlog } from "@/services/blogs";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const BlogFormSection = ({ onCancel, ...props }) => {
  const { showSuccess, showError } = useNotification();
  const queryClient = useQueryClient();

  const createBlogMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: (blog) => {
      showSuccess("Blog created successfully");
      queryClient.setQueryData(["blogs"], (blogs) => blogs.concat(blog));
    },
    onError: (e) => {
      const { message } = handleError(e);
      showError(message);
    },
  });

  return (
    <section {...props}>
      <h2>Create new</h2>
      <BlogForm onCreateBlog={createBlogMutation.mutate} onCancel={onCancel} />
    </section>
  );
};
