import { useQuery } from "@tanstack/react-query";
import { useMatch } from "react-router-dom";

export const BlogView = () => {
  const { data: blogs, isLoading } = useQuery({
    queryKey: ["blogs"],
    refetchOnMount: false,
  });

  const match = useMatch("/blogs/:id");

  if (isLoading) {
    return <p>Loading blog...</p>;
  }

  const blog = match && blogs.find(({ id }) => id === match.params.id);

  return (
    <>
      <h2>
        {blog.title} - {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <p>{blog.likes} likes</p>
      <p>Added by {blog.user.name}</p>
    </>
  );
};
