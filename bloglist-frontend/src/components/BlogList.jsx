export const BlogList = ({ blogs }) => {
  if (blogs.length < 1) {
    return <p>No blogs available</p>;
  }

  return (
    <ul>
      {blogs.map((blog) => (
        <li key={blog.id}>{blog.title}</li>
      ))}
    </ul>
  );
};
