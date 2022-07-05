// import logo from "./logo.svg";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import BlogsPage from "./Pages/Blogs";

const urlEndpoint = "http://localhost:4000";

function App() {
  const [serverJSON, setServerJSON] = useState({ message: null });

  useEffect(() => {
    const fetchData = async () => {
      const apiResponse = await fetch(`${urlEndpoint}/blogs/hello-blogs`);
      const apiJSON = await apiResponse.json();
      setServerJSON(apiJSON);
      return;
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/blogs"
          element={<BlogsPage message={serverJSON.message} />}
        ></Route>
      </Routes>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
