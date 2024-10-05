import { useAuth } from "@/contexts";
import { Button } from "@/components";

export const BlogDetails = ({ blog, onLike, onDelete }) => {
  const { user } = useAuth();

  const isCreator = blog.user.username === user.username;

  const handleDelete = () => {
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}?`)) {
      onDelete(blog.id);
    }
  };

  const handleLike = () => onLike(blog.id);

  return (
    <div id={`blog-${blog.id}-details`}>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes <Button onClick={handleLike} text="Like" />
      </p>
      <p>{blog.user.name}</p>
      {isCreator && <Button onClick={handleDelete} text="Delete" />}
    </div>
  );
};
