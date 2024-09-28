require("dotenv").config();
const { MongoClient } = require("mongodb");
const { test: teardown } = require("@playwright/test");

teardown("cleanup db", async () => {
  const client = new MongoClient(process.env.TEST_MONGODB_URI);

  const connectToDB = async () => {
    try {
      await client.connect();
      console.log("Connected to DB");
    } catch (e) {
      console.error("Couldn't connect to DB", e);
    }
  };

  await connectToDB();
  const db = client.db();

  const blogs = db.collection("blogs");
  const users = db.collection("users");

  await blogs.deleteMany({});
  await users.deleteMany({});

  await client.close();
});
