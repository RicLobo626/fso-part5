const createBlog = async (page, { title, author, url }) => {
  await page.getByRole("button", { name: "New blog" }).click();
  await page.getByLabel("Title").fill(title);
  await page.getByLabel("Author").fill(author);
  await page.getByLabel("URL").fill(url);
  await page.getByRole("button", { name: "Create" }).click();
  await page.getByText(title).waitFor();
  await page.getByRole("button", { name: "Cancel" }).click();
};

module.exports = { createBlog };
