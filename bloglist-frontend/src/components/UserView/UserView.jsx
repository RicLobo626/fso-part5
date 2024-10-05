import { useState } from "react";
import { BlogFormSection, BlogsSection, Button } from "..";
import PropTypes from "prop-types";

export const UserView = ({ user }) => {
  const [formIsVisible, setFormIsVisible] = useState(false);

  const handleToggleForm = () => {
    setFormIsVisible(!formIsVisible);
  };

  return (
    <main>
      <Button
        onClick={handleToggleForm}
        className={formIsVisible ? "hidden" : ""}
        text="New blog"
      />

      <BlogFormSection
        onCancel={handleToggleForm}
        className={!formIsVisible ? "hidden" : ""}
      />

      <BlogsSection user={user} />
    </main>
  );
};

UserView.propTypes = {
  user: PropTypes.object.isRequired,
};
