import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BlogForm } from "@/components";

describe.only("BlogForm component", () => {
  test("onCreateBlog event handler receives the right blog data", async () => {
    const mockCreateBlogHandler = vi.fn();
    render(<BlogForm onCreateBlog={mockCreateBlogHandler} />);

    const user = userEvent.setup();
    const titleInput = screen.getByLabelText("Title");
    const authorInput = screen.getByLabelText("Author");
    const URLInput = screen.getByLabelText("URL");
    const createBtn = screen.getByText("Create");

    const formData = {
      title: "Test blog",
      author: "Test author",
      url: "http://test.com",
    };

    await user.type(titleInput, formData.title);
    await user.type(authorInput, formData.author);
    await user.type(URLInput, formData.url);
    await user.click(createBtn);

    expect(mockCreateBlogHandler).toHaveBeenCalledTimes(1);
    expect(mockCreateBlogHandler).toHaveBeenCalledWith(formData);
  });
});
