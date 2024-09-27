import { Button } from "@/components";

export const BlogForm = ({ onCreateBlog, onCancel }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData);

    onCreateBlog(values, e);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" />
      </div>

      <div>
        <label htmlFor="author">Author</label>
        <input type="text" id="author" name="author" />
      </div>

      <div>
        <label htmlFor="url">URL</label>
        <input type="text" id="url" name="url" />
      </div>

      <Button type="submit" text="Create" />
      <Button onClick={onCancel} text="Cancel" type="button" />
    </form>
  );
};
