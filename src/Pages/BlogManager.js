import { useEffect, useState } from "react";
import BlogManagerCard from "../Components/BlogManagerCard";
import Modal from "../Components/Modal";

const BlogManager = ({
  adminBlogList,
  deleteBlog,
  fetchSingleBlog,
  urlEndpoint,
  setServerResponse,
}) => {
  const [managerSearch, setManagerSearch] = useState("");
  const [blogList, setBlogList] = useState(
    JSON.parse(JSON.stringify(adminBlogList))
  );

  const [showModal, setShowModal] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editAuthor, setEditAuthor] = useState("");
  const [editText, setEditText] = useState("");
  const [editBlogId, setEditBlogId] = useState(null);

  useEffect(() => {
    const searchCards = () => {
      const blogs = JSON.parse(JSON.stringify(adminBlogList));
      if (managerSearch !== "") {
        const filtered = blogs.filter(
          (blog) =>
            blog.title.toLowerCase().includes(managerSearch.toLowerCase()) ||
            blog.author.toLowerCase().includes(managerSearch.toLowerCase()) ||
            String(blog.id).includes(managerSearch)
        );
        setBlogList(filtered);
      } else setBlogList(blogs);
    };
    searchCards();
  }, [adminBlogList, managerSearch]);

  const fetchBlogAndShow = async (id) => {
    const blogPost = await fetchSingleBlog(id);
    setEditTitle(blogPost.title);
    setEditAuthor(blogPost.author);
    setEditText(blogPost.text);
    setEditBlogId(blogPost.id);
    setShowModal(true);
  };

  const putUpdatedBlog = async () => {
    const url = `${urlEndpoint}/admin/edit-blog`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: editBlogId,
        title: editTitle,
        author: editAuthor,
        text: editText,
      }),
    });
    setServerResponse(response);
    setShowModal(false);
    // const responseJSON = await response.json();
    // return responseJSON;
  };

  return (
    <div className="blogManager-container">
      <Modal
        title={editTitle}
        onClose={() => setShowModal(false)}
        showModal={showModal}
        putUpdatedBlog={putUpdatedBlog}
      >
        <label>Title</label>
        <input
          type="text"
          onChange={(e) => {
            setEditTitle(e.target.value);
          }}
          value={editTitle}
        />
        <label>Author</label>
        <input
          type="text"
          onChange={(e) => {
            setEditAuthor(e.target.value);
          }}
          value={editAuthor}
        />
        <label>Text</label>
        <textarea
          onChange={(e) => {
            setEditText(e.target.value);
          }}
          value={editText}
        ></textarea>
      </Modal>
      <h1>Blog Manager</h1>
      <input
        placeholder="Search"
        onChange={(e) => setManagerSearch(e.target.value)}
      />
      <div className="blogManager">
        {blogList.map((blog) => {
          return (
            <BlogManagerCard
              blog={blog}
              deleteBlog={deleteBlog}
              fetchBlogAndShow={fetchBlogAndShow}
              key={blog.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BlogManager;
