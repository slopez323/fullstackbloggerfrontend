// import logo from "./logo.svg";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import BlogsPage from "./Pages/Blogs";
import PostBlogPage from "./Pages/PostBlogPage";
import DeleteBlog from "./Pages/DeleteBlog";

const urlEndpoint = "http://localhost:4000";

function App() {
  const [serverJSON, setServerJSON] = useState([]);
  const [sort, setSort] = useState("");
  const [filterField, setFilterField] = useState("");
  const [filterOptions, setFilterOptions] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const [search, setSearch] = useState("");
  const [searchedBlogs, setSearchedBlogs] = useState([]);

  const [serverResponse, setServerResponse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let sortObj;
      if (sort) {
        const sortField = sort.split("-")[0];
        const sortOrder = sort.substring(sort.indexOf("-") + 1);
        sortObj = `sortField=${sortField}&sortOrder=${sortOrder}&`;
      } else sortObj = "";

      const filter =
        filterField && filterValue
          ? `filterField=${filterField}&filterValue=${filterValue}&`
          : "";

      const limitVal = limit > 0 ? limit : 10;

      const url = `${urlEndpoint}/blogs/all-blogs?${sortObj}${filter}limit=${limitVal}&page=${page}`;
      const apiResponse = await fetch(url);
      const apiJSON = await apiResponse.json();
      setServerJSON(apiJSON);
      return;
    };
    fetchData();
  }, [sort, filterValue, limit, page, serverResponse]);

  useEffect(() => {
    const fetchFilterData = async () => {
      const url = `${urlEndpoint}/blogs/all-blogs`;
      const apiResponse = await fetch(url);
      const blogs = await apiResponse.json();
      const mapped = blogs.map((blog) => blog[filterField]);
      setFilterOptions(mapped);
    };
    fetchFilterData();
  }, [filterField]);

  useEffect(() => {
    const searchFilter = () => {
      if (search !== "") {
        const filtered = serverJSON.filter(
          (blog) =>
            blog.title.toLowerCase().includes(search.toLowerCase()) ||
            blog.author.toLowerCase().includes(search.toLowerCase()) ||
            blog.text.toLowerCase().includes(search.toLowerCase()) ||
            blog.category.toLowerCase().includes(search.toLowerCase())
        );
        setSearchedBlogs(filtered);
      } else {
      }
    };
    searchFilter();
  }, [search]);

  const blogSubmit = async (blog) => {
    const url = `${urlEndpoint}/blogs/blog-submit`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blog),
    });
    setServerResponse(response);
  };

  const blogDelete = async (id) => {
    const url = `${urlEndpoint}/admin/delete-blog/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
    });
  };

  return (
    <div className="App">
      <Routes>
        <Route
          index
          element={
            <BlogsPage
              blogs={search ? searchedBlogs : serverJSON}
              sort={sort}
              setSort={setSort}
              filterField={filterField}
              setFilterField={setFilterField}
              filterOptions={filterOptions}
              setFilterValue={setFilterValue}
              limit={limit}
              setLimit={setLimit}
              page={page}
              setPage={setPage}
              setSearch={setSearch}
            />
          }
        />
        <Route
          path="/post-blog"
          element={<PostBlogPage blogSubmit={blogSubmit} />}
        />
        <Route
          path="/delete-blog"
          element={<DeleteBlog blogDelete={blogDelete} />}
        />
      </Routes>
    </div>
  );
}

export default App;
