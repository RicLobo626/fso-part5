import { Blogs } from "@/components";

export const BlogsSection = ({
  onLikeBlog,
  onDeleteBlog,
  isLoading,
  blogs,
  user,
}) => {
  return (
    <section>
      <h2>All blogs</h2>
      <Blogs
        blogs={blogs}
        isLoading={isLoading}
        onLikeBlog={onLikeBlog}
        onDeleteBlog={onDeleteBlog}
        user={user}
      />
    </section>
  );
};
