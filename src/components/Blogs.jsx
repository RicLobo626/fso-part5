const Blog = ({ blog }) => {
  return (
    <li>
      {blog.title} {blog.author.name}
    </li>
  );
};

export const Blogs = ({ blogs }) => {
  return (
    <ul>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </ul>
  );
};
