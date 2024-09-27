import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Blog } from "@/components";
import { beforeEach, expect } from "vitest";

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

  beforeEach(() => {
    render(<Blog blog={blog} user={user} />);
  });

  test("Blog only renders title and author by default", () => {
    screen.getByText(blog.title, { exact: false });
    screen.getByText(blog.author, { exact: false });
    const url = screen.queryByText(blog.url);
    const likes = screen.queryByText(`${blog.likes} likes`);

    expect(url).toBeNull();
    expect(likes).toBeNull();
  });

  test("Blog renders url, likes, and creator name when expanded", async () => {
    const expandBtn = screen.getByText("View");
    const user = userEvent.setup();
    await user.click(expandBtn);

    screen.getByText("Hide");
    screen.getByText(blog.url);
    screen.getByText(`${blog.likes} likes`);
    screen.getByText(blog.user.name);
  });
});
