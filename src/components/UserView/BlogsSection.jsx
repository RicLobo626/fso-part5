const Blog = ({ blog }) => {
  return (
    <li>
      {blog.title} {blog.author}
    </li>
  );
};

const Blogs = ({ blogs, isLoading }) => {
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

export const BlogsSection = ({ blogs, isLoading }) => {
  return (
    <section>
      <h2>All blogs</h2>
      <Blogs blogs={blogs} isLoading={isLoading} />
    </section>
  );
};
