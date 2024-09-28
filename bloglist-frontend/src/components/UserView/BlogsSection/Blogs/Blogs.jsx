import { Blog } from "@/components";

export const Blogs = ({ onLikeBlog, onDeleteBlog, isLoading, blogs, user }) => {
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
            onLike={onLikeBlog}
            onDelete={onDeleteBlog}
            blog={blog}
            user={user}
            key={blog.id}
          />
        ))}
    </ul>
  );
};
