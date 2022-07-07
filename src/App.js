// import logo from "./logo.svg";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import BlogsPage from "./Pages/Blogs";

const urlEndpoint = "http://localhost:4000";

function App() {
  const [serverJSON, setServerJSON] = useState([]);
  const [sort, setSort] = useState("");
  const [filterField, setFilterField] = useState("");
  const [filterOptions, setFilterOptions] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

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

      const url = `${urlEndpoint}/blogs/all-blogs?${sortObj}${filter}limit=${limit}&page=${page}`;
      const apiResponse = await fetch(url);
      const apiJSON = await apiResponse.json();
      setServerJSON(apiJSON);
      return;
    };
    fetchData();
  }, [sort, filterValue, limit, page]);

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

  return (
    <div className="App">
      <Routes>
        <Route
          path="/blogs"
          element={
            <BlogsPage
              blogs={serverJSON}
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
            />
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
