const { test, describe, beforeEach, expect } = require("@playwright/test");
const path = require("path");

const authFile = path.join(__dirname, "../playwright/.auth/user.json");

describe("Bloglist app", () => {
  beforeEach(async ({ page }) => {
    await page.goto("/");
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
      await page.getByRole("button", { name: "New blog" }).click();
      await page.getByLabel("Title").fill("Test blog");
      await page.getByLabel("Author").fill("Test author");
      await page.getByLabel("URL").fill("http://www.test.com");
      await page.getByRole("button", { name: "Create" }).click();

      await expect(
        page.getByRole("listitem").filter({ hasText: "Test blog" })
      ).toBeVisible();
    });
  });
});
