const { test: teardown } = require("@playwright/test");
const db = require("../db");

teardown("cleanup db", async () => {
  await db.resetBlogs();
  await db.resetUsers();
  await db.disconnect();
});
