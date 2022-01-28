import React, { useState, useContext } from "react";
import { useEffect } from "react/cjs/react.development";
import todoContext from "../context";
import TextareaAutosize from "react-textarea-autosize";

export default function AddNewPost({ createPost, setState }) {
  const { handleSetCreateNew } = useContext(todoContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editComplete, setEditComplete] = useState(false);

  function submitHandleByBtn() {
    if (
      body.length > 0 &&
      title.length > 0 
    ) {
      setEditComplete(true);
    }
  }

  function cancelHandele() {
    handleSetCreateNew();
    setState("todos");
  }

  useEffect(() => {
    if (editComplete === true) {
      createPost(body, title);
    }
  }, [editComplete]);

  return (
    <>
      <div className="todo-container">
        <div className="row">
          <div className="col">
            <div className="body">
              <div className="post-title-container">
                <TextareaAutosize
                  id="title"
                  autoFocus
                  type="text"
                  placeholder="Title Your Post"
                  value={title}
                  className="input-lower-border title-text"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="post-body">
                <TextareaAutosize
                  id="body"
                  type="text"
                  placeholder="Tell All You Want To!"
                  value={body}
                  className="input-no-border"
                  onChange={(e) => setBody(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="edit-optios-btn mb-4">
        <button
          className="btn-green not-select"
          onClick={() => submitHandleByBtn()}
        >
          Add
        </button>
        <button className="btn-red not-select" onClick={() => cancelHandele()}>
          Cancel
        </button>
        <hr className="mt-3" />
      </div>
    </>
  );
}
