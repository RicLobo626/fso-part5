import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Blog } from "@/components";

describe("Blog component", () => {
  const blog = {
    title: "Test blog",
    author: "Test author",
    url: "http://test.com",
    likes: 0,
    user: {
      username: "johnny",
      name: "John Mann",
    },
  };
  const user = { username: "test", name: "Test User" };

  const mockLikeHandler = vi.fn();

  beforeEach(() => {
    render(<Blog blog={blog} user={user} onLike={mockLikeHandler} />);
  });

  describe("by default", () => {
    test("only renders title and author by default", () => {
      screen.getByText(blog.title, { exact: false });
      screen.getByText(blog.author, { exact: false });
      const url = screen.queryByText(blog.url);
      const likes = screen.queryByText(`${blog.likes} likes`);

      expect(url).toBeNull();
      expect(likes).toBeNull();
    });

    test("renders url, likes, and creator name when expanded", async () => {
      const expandBtn = screen.getByText("View");
      const user = userEvent.setup();

      await user.click(expandBtn);

      screen.getByText("Hide");
      screen.getByText(blog.url);
      screen.getByText(`${blog.likes} likes`);
      screen.getByText(blog.user.name);
    });
  });

  describe("when expanded", () => {
    let user;

    beforeEach(async () => {
      const expandBtn = screen.getByText("View");
      user = userEvent.setup();
      await user.click(expandBtn);
    });

    test("Like event handler is called as many times as the user clicks the like button", async () => {
      const likeBtn = screen.getByText("Like");

      await user.click(likeBtn);
      await user.click(likeBtn);

      expect(mockLikeHandler).toHaveBeenCalledTimes(2);
    });
  });
});
