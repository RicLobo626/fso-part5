import { BlogForm } from "@/components";

export const BlogFormSection = ({ onCreateBlog, onCancel, ...props }) => {
  return (
    <section {...props}>
      <h2>Create new</h2>
      <BlogForm onCreateBlog={onCreateBlog} onCancel={onCancel} />
    </section>
  );
};
