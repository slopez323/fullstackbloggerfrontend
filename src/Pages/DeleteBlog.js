import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DeleteBlog = ({ blogDelete }) => {
  const [deleteID, setDeleteID] = useState("");
  const navigate = useNavigate();
  return (
    <div>
      <input onChange={(e) => setDeleteID(e.target.value)} />
      <button
        onClick={() => {
          blogDelete(deleteID);
          navigate("/");
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default DeleteBlog;
