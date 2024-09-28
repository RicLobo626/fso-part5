require("dotenv").config();
const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.TEST_MONGODB_URI);

const connect = async () => {
  try {
    await client.connect();
    console.log("Connected to DB");
  } catch (e) {
    console.error("Couldn't connect to DB", e);
  }
};

const disconnect = () => client.close();

const resetBlogs = async () => {
  const db = client.db();
  const blogs = db.collection("blogs");
  await blogs.deleteMany({});
};

const resetUsers = async () => {
  const db = client.db();
  const users = db.collection("users");
  await users.deleteMany({});
};

module.exports = {
  connect,
  disconnect,
  resetBlogs,
  resetUsers,
};
