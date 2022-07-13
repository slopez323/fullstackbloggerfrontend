import { useNavigate } from "react-router-dom";

const BlogsPage = ({
  blogs,
  sort,
  setSort,
  filterField,
  setFilterField,
  filterOptions,
  setFilterValue,
  limit,
  setLimit,
  page,
  setPage,
  setSearch,
}) => {
  const sortText = sort ? { fontWeight: "bold", color: "yellow" } : {};
  const filterText = filterField ? { fontWeight: "bold", color: "yellow" } : {};

  const navigate = useNavigate();
  return (
    <div className="blogs-page">
      <h1>Blogs Page</h1>
      <div className="options">
        <select
          defaultValue={sort}
          onChange={(e) => setSort(e.target.value)}
          id="sort"
          style={sortText}
        >
          <option value="">Sort</option>
          <option value="id-1">ID ↑</option>
          <option value="id--1">ID ↓</option>
          <option value="title-1">Title ↑</option>
          <option value="title--1">Title ↓</option>
          <option value="author-1">Author ↑</option>
          <option value="author--1">Author ↓</option>
          <option value="createdAt-1">Created At ↑</option>
          <option value="createdAt--1">Created At ↓</option>
        </select>
        <select
          onChange={(e) => setFilterField(e.target.value)}
          id="filter"
          style={filterText}
        >
          <option value="">Filter</option>
          <option value="title">Title</option>
          <option value="author">Author</option>
        </select>
        {filterField && (
          <select
            onChange={(e) => setFilterValue(e.target.value)}
            id="filterOptions"
          >
            <option value="">Choose One</option>
            {filterOptions.map((option, index) => {
              return (
                <FilterOptions option={option} key={`${option}-${index}`} />
              );
            })}
          </select>
        )}
        <div id="limit">
          <p>Limit</p>
          <input
            type="number"
            value={limit}
            min="1"
            onChange={(e) => setLimit(e.target.value)}
          />
        </div>
        <div id="page">
          <p>Page</p>
          <input
            type="number"
            value={page}
            min="1"
            onChange={(e) => setPage(e.target.value)}
          />
        </div>
      </div>
      <div className="options2">
        <input
          placeholder="Search in page"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={() => navigate("/post-blog")}>Add New Post</button>
      </div>
      <div className="blogsDiv">
        {blogs.map((blog) => {
          return <BlogPost blog={blog} key={blog.id} />;
        })}
      </div>
    </div>
  );
};

const FilterOptions = ({ option }) => {
  return <option>{option}</option>;
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
