// import logo from "./logo.svg";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import BlogsPage from "./Pages/Blogs";
import PostBlogPage from "./Pages/PostBlogPage";
import BlogManager from "./Pages/BlogManager";

const urlEndpoint = "http://localhost:4000";

function App() {
  const [serverJSON, setServerJSON] = useState([]);
  const [sort, setSort] = useState("");
  const [filterField, setFilterField] = useState("");
  const [filterOptions, setFilterOptions] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [adminBlogList, setAdminBlogList] = useState([]);

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
  }, [sort, filterField, filterValue, limit, page, serverResponse]);

  useEffect(() => {
    setFilterValue("");
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

  useEffect(() => {
    const fetchAdminBlogList = async () => {
      const data = await fetch(`${urlEndpoint}/admin/blog-list`);
      const json = await data.json();
      setAdminBlogList(json);
      return json;
    };
    fetchAdminBlogList();
  }, [serverResponse]);

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

  const deleteBlog = async (id) => {
    const url = `${urlEndpoint}/admin/delete-blog/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
    });
    setServerResponse(response);
  };

  const fetchSingleBlog = async (blogId) => {
    const url = `${urlEndpoint}/blogs/single-blog/${blogId}`;
    const response = await fetch(url);
    setServerResponse(response);
    const responseJSON = await response.json();
    return responseJSON;
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
              filterValue={filterValue}
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
          path="/blog-manager"
          element={
            <BlogManager
              adminBlogList={adminBlogList}
              deleteBlog={deleteBlog}
              fetchSingleBlog={fetchSingleBlog}
              urlEndpoint={urlEndpoint}
              setServerResponse={setServerResponse}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
