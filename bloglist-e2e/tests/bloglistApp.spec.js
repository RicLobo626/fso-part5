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

    test("succeeds with correct credentials", async ({ page }) => {
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
        title: "Test Blog 1",
        author: "Test author 1",
        url: "http://www.test1.com",
      });

      await expect(
        page.getByRole("listitem").filter({ hasText: "Test Blog 1" })
      ).toBeVisible();
    });

    describe("And several blogs are added and expanded", () => {
      beforeEach(async ({ page }) => {
        for (let i = 1; i < 4; i++) {
          await createBlog(page, {
            title: `Test Blog ${i}`,
            author: `Test Author ${i}`,
            url: `http://www.test${i}.com`,
          });
        }

        for (const blog of await page.getByRole("listitem").all()) {
          await blog.getByRole("button", { name: "View" }).click();
        }
      });

      test("user can like a blog", async ({ page }) => {
        const blog = page.getByRole("listitem").filter({ hasText: "Test Blog 1" });
        await expect(blog.getByText("likes")).toContainText("0 likes");
        await blog.getByRole("button", { name: "Like" }).click({ clickCount: 3 });
        await expect(blog.getByText("likes")).toContainText("3 likes");
      });

      test("blogs are ordered by likes", async ({ page }) => {
        const firstBlog = page
          .getByRole("listitem")
          .filter({ hasText: "Test Blog 1" });

        await firstBlog
          .getByRole("button", { name: "Like" })
          .click({ clickCount: 3 });

        await expect(firstBlog).toContainText("3 likes");

        let thirdBlog = page
          .getByRole("listitem")
          .filter({ hasText: "Test Blog 3" });

        thirdBlog.getByRole("button", { name: "Like" }).click();

        // Third blog should now be the second one on the list, needs to be fetched again
        thirdBlog = page.getByRole("listitem").filter({ hasText: "Test Blog 3" });

        await expect(thirdBlog).toContainText("1 likes");

        await expect(page.locator('ul > li:has-text("Test Blog")')).toContainText([
          "3 likes",
          "1 likes",
          "0 likes",
        ]);
      });

      test("the user can delete own blogs", async ({ page }) => {
        const blog = page.getByRole("listitem").filter({ hasText: "Test blog 2" });
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
