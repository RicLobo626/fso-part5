export const Comments = ({ comments }) => {
  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>
          {comment.content} - {comment.user.name}
        </li>
      ))}
    </ul>
  );
};
