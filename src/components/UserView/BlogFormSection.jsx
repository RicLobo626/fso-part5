const BlogForm = ({ onSubmit }) => {
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

      <button type="submit">Create</button>
    </form>
  );
};

export const BlogFormSection = ({ onCreateBlog }) => {
  return (
    <section>
      <h2>Create new</h2>
      <BlogForm onSubmit={onCreateBlog} />
    </section>
  );
};
