import { Route, Routes } from "react-router-dom";
import { BlogsView, BlogView } from "@/views";
import { getBlogs } from "@/services/blogs";
import { useQuery } from "@tanstack/react-query";

export const HomeView = () => {
  useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  return (
    <>
      <Routes>
        <Route path="/" element={<BlogsView />} />
        <Route path="/blogs/:id" element={<BlogView />} />
      </Routes>
    </>
  );
};
