import { useEffect, useState } from "react";
import BlogManagerCard from "../Components/BlogManagerCard";

const BlogManager = ({ adminBlogList, deleteBlog }) => {
  const [managerSearch, setManagerSearch] = useState("");
  const [blogList, setBlogList] = useState(
    JSON.parse(JSON.stringify(adminBlogList))
  );

  useEffect(() => {
    const searchCards = () => {
      if (managerSearch !== "") {
        const filtered = blogList.filter(
          (blog) =>
            blog.title.toLowerCase().includes(managerSearch.toLowerCase()) ||
            blog.author.toLowerCase().includes(managerSearch.toLowerCase()) ||
            String(blog.id).includes(managerSearch)
        );
        setBlogList(filtered);
      } else setBlogList(JSON.parse(JSON.stringify(adminBlogList)));
    };
    searchCards();
  }, [adminBlogList, managerSearch]);

  return (
    <div className="blogManager-container">
      <h1>Blog Manager</h1>
      <input
        placeholder="Search"
        onChange={(e) => setManagerSearch(e.target.value)}
      />
      <div className="blogManager">
        {blogList.map((blog) => {
          return (
            <BlogManagerCard
              blog={blog}
              deleteBlog={deleteBlog}
              key={blog.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BlogManager;
