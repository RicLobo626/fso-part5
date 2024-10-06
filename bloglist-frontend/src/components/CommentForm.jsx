import { Button } from "@/components/Button";

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
      <Button type="submit" text="Add comment" className="btn-slate" />
    </form>
  );
};
