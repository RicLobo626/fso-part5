import { BlogForm, Blogs, Button } from "@/components";
import { useNotification } from "@/contexts";
import { handleError } from "@/helpers/errorHelper";
import { createBlog } from "@/services/blogs";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import clsx from "clsx";

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
        className={clsx("btn-slate mb-6", { hidden: formIsVisible })}
        text="New blog"
      />

      <section className={clsx("section mb-6", { hidden: !formIsVisible })}>
        <h2 className="text-2xl mb-4">Create new</h2>

        <BlogForm
          onCreateBlog={createBlogMutation.mutate}
          onCancel={handleToggleForm}
        />
      </section>

      <section className="section">
        <h2 className="text-2xl mb-4">All blogs</h2>
        <Blogs />
      </section>
    </>
  );
};
