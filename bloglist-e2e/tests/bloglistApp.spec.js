const { test, describe, beforeEach, expect } = require("@playwright/test");
const { createBlog, loginWith } = require("./helper");
const db = require("../db");

const userFile = "playwright/.auth/user.json";
const otherUserFile = "playwright/.auth/other-user.json";

describe("Bloglist app", () => {
  beforeEach(async ({ page }) => {
    await page.goto("/");
    await db.resetBlogs();
  });

  test("heading is shown", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Bloglist" })).toBeVisible();
  });

  test("login form is shown", async ({ page }) => {
    await expect(page.getByLabel("Username")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
    await expect(page.getByRole("button", { name: "Login" })).toBeVisible();
  });

  describe("Login", () => {
    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "testuser", "wrongpassword");
      await expect(page.getByRole("alert")).toHaveText(
        "invalid username or password"
      );
    });

    test("succeeds with correct credentials", async ({ page, browser }) => {
      await loginWith(page, "testuser", "12345");
      await expect(page.getByRole("alert")).toHaveText("Login successful");
    });
  });

  describe("When logged in", async () => {
    test.use({ storageState: userFile });

    test("welcome message and logout button are shown", async ({ page }) => {
      await expect(page.getByText("Welcome")).toBeVisible();
      await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
    });

    test("a new blog can be created", async ({ page }) => {
      await createBlog(page, {
        title: "Test blog 1",
        author: "Test author 1",
        url: "http://www.test1.com",
      });

      await expect(
        page.getByRole("listitem").filter({ hasText: "Test blog 1" })
      ).toBeVisible();
    });

    describe("And several blogs are added", () => {
      beforeEach(async ({ page }) => {
        for (let i = 1; i < 4; i++) {
          await createBlog(page, {
            title: `Test blog ${i}`,
            author: `Test author ${i}`,
            url: `http://www.test${i}.com`,
          });
        }
      });

      describe("And a blog is expanded", () => {
        let blog;

        beforeEach(async ({ page }) => {
          blog = page.getByRole("listitem").filter({ hasText: "Test blog 2" });
          await blog.getByRole("button", { name: "View" }).click();
        });

        test("a user can like the blog", async () => {
          await expect(blog.getByText("likes")).toContainText("0 likes");
          await blog.getByRole("button", { name: "Like" }).click();
          await blog.getByRole("button", { name: "Like" }).click();
          await expect(blog.getByText("likes")).toContainText("2 likes");
        });

        test("the user who added the blog can delete it", async ({ page }) => {
          page.on("dialog", (dialog) => dialog.accept());
          await blog.getByRole("button", { name: "Delete" }).click();
          await expect(blog).not.toBeVisible();
        });
      });
    });
  });

  test("users can't delete blogs that were added by another user", async ({
    browser,
  }) => {
    const userContext = await browser.newContext({ storageState: userFile });
    const otherUserContext = await browser.newContext({
      storageState: otherUserFile,
    });

    const userPage = await userContext.newPage();
    const otherUserPage = await otherUserContext.newPage();

    await userPage.goto("/");

    await createBlog(userPage, {
      title: "Blog by user",
      author: "Test author",
      url: "http://www.testblog.com",
    });

    await otherUserPage.goto("/");

    const blogAddedByUser = otherUserPage
      .getByRole("listitem")
      .filter({ hasText: "Blog by user" });

    await blogAddedByUser.getByRole("button", { name: "View" }).click();

    await expect(
      blogAddedByUser.getByRole("button", { name: "Delete" })
    ).not.toBeVisible();

    await userContext.close();
    await otherUserContext.close();
  });
});
