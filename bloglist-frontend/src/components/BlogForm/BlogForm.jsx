import { Button, Field } from "@/components";
import PropTypes from "prop-types";

export const BlogForm = ({ onCreateBlog, onCancel }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData);

    onCreateBlog(values);
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Field label="Title" id="title" name="title" />
      <Field label="Author" id="author" name="author" />
      <Field label="URL" id="url" name="url" />

      <hr className="my-4" />

      <Button type="submit" text="Create" className="btn-slate mr-2" />
      <Button onClick={onCancel} text="Cancel" type="button" className="btn-slate" />
    </form>
  );
};

BlogForm.propTypes = {
  onCreateBlog: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};
