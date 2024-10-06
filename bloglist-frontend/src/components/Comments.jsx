export const Comments = ({ comments }) => {
  return (
    <ul className="border px-4">
      {comments.map((comment) => (
        <li key={comment.id} className=" border-b py-3">
          <span className="font-semibold">{comment.user.name}:</span>{" "}
          {comment.content}
        </li>
      ))}
    </ul>
  );
};
