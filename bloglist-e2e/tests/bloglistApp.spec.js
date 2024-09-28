const { test, describe, beforeEach, expect } = require("@playwright/test");

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
});
