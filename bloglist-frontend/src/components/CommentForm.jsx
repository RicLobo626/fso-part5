import { Button } from "@/components";
import { Textarea } from "@/components";

export const CommentForm = ({ onAddComment, ...props }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const content = e.target.content.value;

    onAddComment({ content });
  };

  return (
    <form onSubmit={handleSubmit} {...props}>
      <Textarea label="Add a comment" id="comment" name="content" />
      <Button type="submit" text="Add" className="btn-slate" />
    </form>
  );
};
