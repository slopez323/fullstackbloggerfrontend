const BlogsPage = ({ blogs }) => {
  return (
    <div className="blogs-page">
      <h1>Blogs Page</h1>
      <div className="blogsDiv">
        {blogs.map((blog) => {
          return <BlogPost blog={blog} key={blog.id} />;
        })}
      </div>
    </div>
  );
};

const BlogPost = ({ blog }) => {
  return (
    <div className="blogPost">
      <p>
        <span>Title: </span>
        {blog.title}
      </p>
      <p>
        <span>Author: </span>
        {blog.author}
      </p>
      <p>
        <span>Category: </span>
        {blog.category}
      </p>
      <p>
        <span>
          Text: <br />
        </span>
        {blog.text}
      </p>
      <p>
        <span>Created At: </span>
        {blog.createdAt}
      </p>
      <p>
        <span>Last Modified: </span>
        {blog.lastModified}
      </p>
      <p>
        <span>ID: </span>
        {blog.id}
      </p>
      <hr />
    </div>
  );
};

export default BlogsPage;
