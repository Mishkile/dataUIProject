import React, { useState, useEffect, useContext } from "react";
import todoContext from "../context";
import TextareaAutosize from "react-textarea-autosize";

export default function AddNewTodo({ todoList, createTodo }) {
  const [text, setText] = useState("");
  const { handleSetCreateNew } = useContext(todoContext);

  function addByBtn() {
    if (
      text.length &&
      text.charCodeAt(0) !== 32 &&
      text.charCodeAt(0) !== 10 &&
      text.split(" ").every((ch, i) => ch.charCodeAt(i) !== 32)
    ) {
      createTodo(todoList, text);
      handleSetCreateNew();
    }
  }

  return (
    <>
      <div className="todo-title mt-3">
        <h5>Create New Todo</h5>
      </div>
      <div className="todo-container mb-2">
        <div className="todo-title-container">
          <div className="todo-title">
            <TextareaAutosize
              type="text"
              autoFocus
              value={text}
              col="30"
              className="input-no-border"
              placeholder="Enter todo title"
              onChange={(e) => setText(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="edit-optios-btn mb-4">
        <button className="btn-green not-select" onClick={() => addByBtn()}>
          Add
        </button>
        <button className="btn-red not-select" onClick={() => handleSetCreateNew()}>
          Cancel
        </button>
        <hr className="mt-3" />
      </div>
    </>
  );
}
