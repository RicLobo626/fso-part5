import { useState } from "react";
import { BlogForm, Blogs, Button } from "..";
import PropTypes from "prop-types";
import { handleError } from "@/helpers/errorHelper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotification } from "@/contexts/NotificationContext";
import { createBlog } from "@/services/blogs";

export const UserView = ({ user }) => {
  const [formIsVisible, setFormIsVisible] = useState(false);
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

  const handleToggleForm = () => {
    setFormIsVisible(!formIsVisible);
  };

  return (
    <main>
      <Button
        onClick={handleToggleForm}
        className={formIsVisible ? "hidden" : ""}
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
        <Blogs user={user} />
      </section>
    </main>
  );
};

UserView.propTypes = {
  user: PropTypes.object.isRequired,
};
