export const CommentForm = ({ onAddComment }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const content = e.target.content.value;

    onAddComment({ content });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="comment">Comment</label>
      <div>
        <textarea id="comment" name="content" />
      </div>
      <button type="submit">Add comment</button>
    </form>
  );
};
