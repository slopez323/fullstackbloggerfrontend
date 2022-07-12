import { useState } from "react";

const DeleteBlog = ({ blogDelete }) => {
  const [deleteID, setDeleteID] = useState("");
  return (
    <div>
      <input onChange={(e) => setDeleteID(e.target.value)} />
      <button onClick={() => blogDelete(deleteID)}>Submit</button>
    </div>
  );
};

export default DeleteBlog;
