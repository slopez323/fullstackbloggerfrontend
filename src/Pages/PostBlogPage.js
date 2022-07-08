import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PostBlogPage = ({ blogSubmit }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  return (
    <div className="newPost">
      <h1>Create New Blog Post</h1>
      <input
        type="text"
        placeholder="Title"
        required
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Author"
        required
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        type="text"
        placeholder="Category"
        onChange={(e) => setCategory(e.target.value)}
      />
      <textarea
        placeholder="Text"
        required
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={() => {
          if (title && text && author) {
            blogSubmit({ title, text, author, category });
            navigate("/");
          }
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default PostBlogPage;
