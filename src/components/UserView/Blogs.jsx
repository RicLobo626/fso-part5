const Blog = ({ blog }) => {
  return (
    <li>
      {blog.title} {blog.author}
    </li>
  );
};

export const Blogs = ({ blogs, isLoading }) => {
  if (isLoading) {
    return <p>Loading blogs...</p>;
  }

  if (blogs.length === 0) {
    return <p>No blogs </p>;
  }

  return (
    <ul>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </ul>
  );
};
