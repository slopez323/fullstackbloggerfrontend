import BlogManagerCard from "../Components/BlogManagerCard";

const BlogManager = ({ adminBlogList, deleteBlog }) => {
  return (
    <div className="blogManager-container">
      <h1>Blog Manager</h1>
      <div className="blogManager">
        {adminBlogList.map((blog) => {
          return <BlogManagerCard blog={blog} deleteBlog={deleteBlog} />;
        })}
      </div>
    </div>
  );
};

export default BlogManager;
