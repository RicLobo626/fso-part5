const { test: setup, expect } = require("@playwright/test");
const { loginWith } = require("./helper");
const path = require("path");

const userFile = "playwright/.auth/user.json";

setup("authenticate as user", async ({ page }) => {
  await page.goto("/");
  await loginWith(page, "testuser", "12345");
  await expect(page.getByRole("alert")).toHaveText("Login successful");
  await page.context().storageState({ path: userFile });
});

const otherUserFile = "playwright/.auth/other-user.json";

setup("authenticate as other user", async ({ page }) => {
  await page.goto("/");
  await loginWith(page, "othertestuser", "12345");
  await expect(page.getByRole("alert")).toHaveText("Login successful");
  await page.context().storageState({ path: otherUserFile });
});
