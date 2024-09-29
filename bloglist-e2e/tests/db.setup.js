const { test: setup } = require("@playwright/test");
const db = require("../db");

setup("setup db", async ({ request }) => {
  await db.connect();
  await request.post("/api/users", {
    data: { username: "testuser", name: "Test User", password: "12345" },
  });
  await request.post("/api/users", {
    data: { username: "othertestuser", name: "Other Test User", password: "12345" },
  });
});
