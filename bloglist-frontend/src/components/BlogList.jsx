import clsx from "clsx";

export const BlogList = ({ blogs }) => {
  if (blogs.length < 1) {
    return <p>No blogs available</p>;
  }
  console.log(blogs[0]);
  return (
    <ul className="rounded border">
      {blogs.map((blog, i) => (
        <li
          key={blog.id}
          className={clsx("flex flex-col p-2", {
            "border-b": blogs.length - 1 !== i,
          })}
        >
          <p>
            <span className="font-medium">Title: </span>
            {blog.title}
          </p>

          <p>
            <span className="font-medium">Author: </span>
            {blog.author}
          </p>
        </li>
      ))}
    </ul>
  );
};
