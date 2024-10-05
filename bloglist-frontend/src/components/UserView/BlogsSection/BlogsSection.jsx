import { Blogs } from "@/components";

export const BlogsSection = ({ user }) => {
  return (
    <section>
      <h2>All blogs</h2>
      <Blogs user={user} />
    </section>
  );
};
