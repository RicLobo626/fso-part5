const { test: teardown } = require("@playwright/test");
const db = require("../db");

teardown("setup db", async ({ request }) => {
  await db.connect();
  await request.post("/api/users", {
    data: { username: "testuser", name: "Test User", password: "12345" },
  });
});
