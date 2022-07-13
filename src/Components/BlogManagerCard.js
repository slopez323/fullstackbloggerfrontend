const BlogManagerCard = ({ blog, deleteBlog }) => {
  return (
    <div className="blogCard">
      <p>
        <span>Title: </span>
        {blog.title}
      </p>
      <p>
        <span>Author: </span>
        {blog.author}
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
      <button onClick={() => deleteBlog(blog.id)}>Delete</button>
    </div>
  );
};

export default BlogManagerCard;
