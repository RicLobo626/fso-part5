const loginWith = async (page, username, password) => {
  await page.getByLabel("Username").fill(username);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Login" }).click();
};

const createBlog = async (page, { title, author, url }) => {
  await page.getByRole("button", { name: "New blog" }).click();
  await page.getByLabel("Title").fill(title);
  await page.getByLabel("Author").fill(author);
  await page.getByLabel("URL").fill(url);
  await page.getByRole("button", { name: "Create" }).click();
  await page.getByRole("button", { name: "Cancel" }).click();
  await page.locator("li", { hasText: title }).waitFor();
};

module.exports = { loginWith, createBlog };
