import { BlogForm, Blogs, Button } from "@/components";
import { useNotification } from "@/contexts";
import { handleError } from "@/helpers/errorHelper";
import { createBlog } from "@/services/blogs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export const BlogsView = () => {
  const queryClient = useQueryClient();
  const [formIsVisible, setFormIsVisible] = useState(false);
  const { showSuccess, showError } = useNotification();

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

  const handleToggleForm = () => {
    setFormIsVisible(!formIsVisible);
  };

  return (
    <>
      <Button
        onClick={handleToggleForm}
        className={formIsVisible ? "hidden" : "btn-slate"}
        text="New blog"
      />

      <section className={!formIsVisible ? "hidden" : ""}>
        <h2>Create new</h2>
        <BlogForm
          onCreateBlog={createBlogMutation.mutate}
          onCancel={handleToggleForm}
        />
      </section>

      <section>
        <h2>All blogs</h2>
        <Blogs />
      </section>
    </>
  );
};
