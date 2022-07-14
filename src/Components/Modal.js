import React from "react";
import "./Modal.css";

const Modal = ({ showModal, onClose, title, children, putUpdatedBlog }) => {
  if (!showModal) {
    return <></>;
  }

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">{title}</h4>
        </div>
        <div className="modal-body">{children}</div>
        <div className="modal-footer">
          <button
            onClick={() => {
              putUpdatedBlog();
            }}
          >
            Update Blog
          </button>
          <button onClick={onClose} className="button">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
