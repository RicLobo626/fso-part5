const { test: teardown } = require("@playwright/test");

teardown("create user", async ({ request }) => {
  await request.post("/api/users", {
    data: { username: "testuser", name: "Test User", password: "12345" },
  });
});
