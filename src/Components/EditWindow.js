import React, { useState, useEffect, useContext } from "react";
import xSymbol from "../assets/image/x-symbol.png";
import addSymbol from "../assets/image/add-symbol.png";
import EditDefault from "./EditDefault";
import Todo from "./Todo";
import Context from "../context";
import todoContext from "../context";
import postContext from "../context";
import AddNewTodo from "./AddNewTodo";
import AddNewPost from "./AddNewPost";
import Posts from "./Posts";
import useDynamicRefs from "use-dynamic-refs";
import topArrow from "../assets/image/top-arrow.png";

export default function EditWindow({ todos, posts, userID }) {
  const { updateTodos, updatePosts, setChoosedUser } = useContext(Context);
  const [state, setState] = useState("todos");
  const [classesTodo, setClassesTodo] = useState(
    "btn-border-less edit-head-not-choosed"
  );
  const [classesPost, setClassesPost] = useState(
    "btn-border-less edit-head-not-choosed"
  );
  const [createNew, setCreateNew] = useState(false);
  const [childData, setChildData] = useState([]);
  const [childDataPost, setChildDataPost] = useState([]);
  const [scrollToTop, setScrollToTop] = useState(false);
  const [scrollTopClasses, setScrollTopClasses] = useState(
    "not-select scroll-top-disable"
  );
  const [scrollStage, setScrollStage] = useState(0);

  const foo = ["divRef"];
  const [getRef, setRef] = useDynamicRefs();

  //scroll up func
  useEffect(() => {
    const id1 = getRef("divRef");
    id1.current.scrollTop = 0;
  }, [scrollToTop]);

  //check scroll position
  useEffect(() => {
    const id1 = getRef("divRef");
    if (id1.current.scrollTop > 100) {
      setScrollTopClasses("not-select scroll-top-able");
    } else {
      setScrollTopClasses("not-select scroll-top-disable");
    }
  }, [scrollStage]);

  useEffect(() => {
    if (userID === 0) {
      setState("default");
    }
    if (userID !== 0) {
      setState("todos");
    }
  }, [userID]);

  useEffect(() => {
    if (state === "posts") {
      setClassesTodo("btn-border-less edit-head-not-choosed not-select");
      setClassesPost("btn-border-less edit-head-choosed not-select");
    }
    if (state === "todos") {
      setClassesTodo("btn-border-less edit-head-choosed not-select");
      setClassesPost("btn-border-less edit-head-not-choosed not-select");
    }
    if (state === "default") {
      setClassesTodo("btn-border-less edit-head-not-choosed not-select");
      setClassesPost("btn-border-less edit-head-not-choosed not-select");
    }
    if (createNew === true) {
      handleSetCreateNew();
    }
  }, [state]);

  function createTodo(list, title) {
    if (createNew && state === "todos") {
      let obj = {
        userId: userID,
        id: list.length + 1,
        title: title,
        completed: false,
      };
      list.push(obj);
      updateTodos(list);
    }
  }

  function createPost(body, title) {
    if (createNew && state === "posts") {
      let obj = {
        userId: userID,
        id: childDataPost.length + 1,
        title,
        body,
      };
      updatePosts(childDataPost.concat(obj), userID);
    }
  }

  const childToParent = (childData) => {
    setChildData(childData);
  };

  const childToParentPost = (childData) => {
    setChildDataPost(childData);
  };

  function handleSetCreateNew() {
    setCreateNew(!createNew);
  }

  return (
    <>
      <div className="sticky fixedHeightContainer">
        <div className="row">
          <div className="col">
            <div className="edit-head">
              <div className="edit-head-btn">
                <button
                  className="edit-title-btn not-select"
                  onClick={() => setChoosedUser(0)}
                >
                  <img src={xSymbol} alt="" className="edit-title-img" />
                </button>
              </div>
              <div className="edit-title">
                <button
                  className={classesTodo}
                  onClick={() => {
                    if (userID !== 0) setState("todos");
                  }}
                >
                  Todos
                </button>
                <span className="edit-head-not-choosed not-select">|</span>
                <button
                  className={classesPost}
                  onClick={() => {
                    if (userID !== 0) setState("posts");
                  }}
                >
                  Posts
                </button>
              </div>
              <div className="edit-add-new">
                <button
                  className="edit-title-btn not-select"
                  onClick={() => setCreateNew(!createNew)}
                >
                  <img src={addSymbol} alt="" className="edit-title-img" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div
              className="body Content"
              ref={setRef("divRef")}
              onScroll={() => setScrollStage(!scrollStage)}
            >
              {state === "todos" && (
                <>
                  {createNew && (
                    <todoContext.Provider value={{ handleSetCreateNew }}>
                      <AddNewTodo
                        createTodo={createTodo}
                        todoList={childData}
                        createNew={createNew}
                      />
                    </todoContext.Provider>
                  )}

                  <Todo
                    todos={todos}
                    userID={userID}
                    createNew={createNew}
                    childToParent={childToParent}
                  />
                </>
              )}
              {state === "posts" && (
                <>
                  {createNew && (
                    <postContext.Provider value={{ handleSetCreateNew }}>
                      <AddNewPost
                        createPost={createPost}
                        todoList={childDataPost}
                        setState={setState}
                      />
                    </postContext.Provider>
                  )}
                  <Posts
                    posts={posts}
                    userID={userID}
                    createNew={createNew}
                    childToParentPost={childToParentPost}
                    handleSetCreateNew={handleSetCreateNew}
                  />
                </>
              )}

              {state === "default" && <EditDefault />}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="edit-foot mt-2">
              {state == "todos" && (
                <>
                  <div>
                    <img
                      src={topArrow}
                      width="20"
                      height="15"
                      className={scrollTopClasses}
                      onClick={() => setScrollToTop(!scrollToTop)}
                    />
                  </div>
                  <div>
                    <p className="foot-text not-select">
                      Click on todo to change status !
                    </p>
                  </div>
                </>
              )}
              {state === "posts" && (
                <>
                  <div>
                    <img
                      src={topArrow}
                      width="20"
                      height="15"
                      className={scrollTopClasses}
                      onClick={() => setScrollToTop(!scrollToTop)}
                    />
                  </div>
                  <div>
                    <p className="foot-text not-select">
                      Share your thoughts with the world !
                    </p>
                  </div>
                </>
              )}
              {state === "default" && (
                <p className="foot-text not-select">
                  Click on user to see more about him !
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
