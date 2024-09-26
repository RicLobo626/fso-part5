import { Button } from "..";

const BlogForm = ({ onSubmit, onCancel }) => {
  return (
    <form onSubmit={onSubmit}>
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

export const BlogFormSection = ({ onCreateBlog, onCancel, ...props }) => {
  return (
    <section {...props}>
      <h2>Create new</h2>
      <BlogForm onSubmit={onCreateBlog} onCancel={onCancel} />
    </section>
  );
};
