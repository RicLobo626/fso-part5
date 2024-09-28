const { test, describe, beforeEach, expect } = require("@playwright/test");
const { createBlog } = require("./helper");
const path = require("path");
const db = require("../db");

const authFile = path.join(__dirname, "../playwright/.auth/user.json");

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
      await page.getByLabel("Username").fill("testuser");
      await page.getByLabel("Password").fill("wrongpassword");
      await page.getByRole("button", { name: "Login" }).click();

      await expect(page.getByRole("alert")).toHaveText(
        "invalid username or password"
      );
    });

    test("succeeds with correct credentials", async ({ page }) => {
      await page.getByLabel("Username").fill("testuser");
      await page.getByLabel("Password").fill("12345");
      await page.getByRole("button", { name: "Login" }).click();

      await expect(page.getByRole("alert")).toHaveText("Login successful");

      await page.context().storageState({ path: authFile });
    });
  });

  describe("When logged in", () => {
    test.use({ storageState: authFile });

    test("welcome message and logout button are shown", async ({ page }) => {
      await expect(page.getByText("Welcome", { exact: false })).toBeVisible();
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

    describe("And several blogs exist", () => {
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
        beforeEach(async ({ page }) => {
          await page
            .getByRole("listitem")
            .filter({ hasText: "Test blog 2" })
            .getByRole("button", { name: "View" })
            .click();
        });

        test("a blog can be liked", async ({ page }) => {
          const blog = page.getByRole("listitem").filter({ hasText: "Test blog 2" });

          await expect(blog.getByText("likes")).toContainText("0 likes");
          await page.getByRole("button", { name: "Like" }).click();
          await page.getByRole("button", { name: "Like" }).click();
          await expect(blog.getByText("likes")).toContainText("2 likes");
        });
      });
    });
  });
});
