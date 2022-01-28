import React, { useContext } from "react";
import { useEffect, useState } from "react/cjs/react.development";
import Context from "../context";
import TextareaAutosize from "react-textarea-autosize";

export default function Todo({ userID, createNew, childToParent }) {
  const { filterById, updateTodos } = useContext(Context);
  const [todoList, setTodoList] = useState([]);
  const [isExist, setIsExist] = useState(false);
  const [isAllCompleted, setIsAllCompleted] = useState(false);
  const [isCompletedExist, setIsCompletedExist] = useState(false);
  const [cleared, setCleared] = useState(false)
  
  useEffect(() => {
    setTodoList(filterById(userID, "_todos"));
  }, [userID]);

  useEffect(() => {
    if (todoList.length > 0) {
      setIsExist(true);
    } 
    setIsAllCompleted(todoList.every((todo) => todo.completed === true));
    let a;
    todoList.forEach((todo) => {
      if (todo.completed === true) {
        a = true;
      }
    });
    setIsCompletedExist(a);
    updateTodos(todoList, userID);
    
  }, [todoList]);

 
  useEffect(() => {
    childToParent(todoList);
    if (todoList.length > 0) {
      setIsExist(true);
      setCleared(true)
    }
  }, [createNew]);

  function doCheck(todo, status, index) {
    todo.completed = status;
    setTodoList(
      todoList.map((t, i) => {
        if (i === index) {
          return todo;
        }
        return t;
      })
    );
  }

  function checkAll() {
    let a = [];
    todoList.forEach((todo) => {
      let n = {
        ...todo,
        completed: true,
      };
      a.push(n);
    });
    setTodoList(a);
    setCleared(false)
  }

  function uncheckAll() {
    let a = [];
    todoList.forEach((todo) => {
      let n = {
        ...todo,
        completed: false,
      };
      a.push(n);
    });
    setTodoList(a);
  }

  function clearCompleted() {
    let a = todoList.filter((todo) => todo.completed === false);
    setTodoList(a);
    setCleared(true)
    if(todoList.length > 0){
      setIsExist(false)
    }
  }

  return (
    <>
      {todoList.length > 0 && (
        <>
          <div className="edit-optios-btn">
            {!isAllCompleted || cleared ? (
              <button className="btn-green not-select" onClick={checkAll.bind(null)}>
                Mark All
              </button>
            ) : (
              <button className="btn-green not-select" onClick={uncheckAll.bind(null)}>
                Unmark All
              </button>
            )}
            {isCompletedExist ? (
              <button className="btn-red not-select" onClick={clearCompleted.bind(null)}>
                Clear Completed
              </button>
            ) : (
              <button className="btn-red not-select" disabled>
                Clear Completed
              </button>
            )}
          </div>
        </>
      )}
      {todoList.length < 1 && (
        <>
          <div className="edit-optios-btn not-select">
            <button className="btn-green" disabled>
              Mark All
            </button>
            <button className="btn-red not-select" disabled>
              Clear Completed
            </button>
          </div>
        </>
      )}
      {isExist &&
        todoList.map((todo, index) => {
          return (
            <div key={index} className="todo-container">
              <div className="todo-title-container">
                <TextareaAutosize
                  disabled
                  value={todo.title}
                  className="todo-title input-no-border"
                  key={index + 1}
                />
              </div>
              <div className="round">
                <input
                  key={index + 2}
                  type="checkbox"
                  id={index}
                  checked={todo.completed}
                  onChange={(e) => doCheck(todo, e.target.checked, index)}
                />
                <label htmlFor={index}></label>
              </div>
            </div>
          );
        })}
      {!isExist   && (
        <div className="edit-body">
          <div className="container-text">
            <h3 className="title not-select">No Todos yet!</h3>
            <p className="text not-select">You always can create one!</p>
          </div>
        </div>
      )}
    </>
  );
}
