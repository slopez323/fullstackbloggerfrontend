// import logo from "./logo.svg";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import BlogsPage from "./Pages/Blogs";

const urlEndpoint = "http://localhost:4000";

function App() {
  const [serverJSON, setServerJSON] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const url = `${urlEndpoint}/blogs/all-blogs`;
      const apiResponse = await fetch(url);
      const apiJSON = await apiResponse.json();
      setServerJSON(apiJSON);
      return;
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <Routes>
        {serverJSON && (
          <Route
            path="/blogs"
            element={<BlogsPage blogs={serverJSON} />}
          ></Route>
        )}
      </Routes>
    </div>
  );
}

export default App;
