import React, { useEffect, useState } from "react";
import Context from "./context";
import getUserData from "./utils/dbUtils";
import User from "./Components/User";
import NavBar from "./Components/NavBar";
import EditWindow from "./Components/EditWindow";
import Modal from "./Components/Modal/Modal";
import ScrollToTop from "./Components/ScrollToTop";
import Loading from "./Components/Loading/Loading";
import NewUser from "./Components/NewUser";
import Container from "./Components/Container";

function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [todos, setTodos] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [querry, setQuerry] = useState();
  const [found, setFound] = useState([]);
  const [choosedUser, setChoosedUser] = useState(0);
  const [modalActive, setModalActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bodyClass, setBodyClass] = useState("container pointer-events-off");
  const [lastUserId, setLastUserId] = useState([0]);
  const [firstLoad, setFirstLoad] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      const response = await getUserData(0, "__GET_ALL__");
      setUsers(response.users);
      setTodos(response.todos);
      setPosts(response.posts);
      setIsSearch(false);
      setIsLoading(false);
    }
    fetchData();
    setFirstLoad(true)
    return () => {};
  }, []);

  useEffect(() => {
    if (isLoading) {
      setBodyClass("container pointer-events-off");
    } else {
      setBodyClass("container pointer-events-on");
    }
    return () => {};
  }, [isLoading]);

  function search(querry) {
    setQuerry(querry);
    if (querry !== "") {
      if (typeof querry !== "number") {
        setFound(
          users.filter(
            (user) =>
              user.name.toLocaleLowerCase().includes(querry) ||
              user.email.toLocaleLowerCase().includes(querry)
          )
        );
      }
      if (parseInt(querry)) {
        setFound(users.filter((user) => user.id === parseInt(querry)));
      }
    } else {
      setFound([]);
    }
  }

  //if searching enter empty render all users else show results
  useEffect(() => {
    if (querry !== "") {
      setIsSearch(true);
    } else {
      setIsSearch(false);
    }
  }, [found]);

  function saveUser(newUser, userId) {
    setUsers(
      users.map((user) => {
        if (user.id === userId) {
          return newUser;
        }
        return user;
      })
    );
  }

  function filterById(id, type) {
    if (type === "_todos") {
      for (let i = 0; i < users.length; i++) {
        return todos.filter((todo) => todo.userId === id);
      }
    } else if (type === "_posts") {
      for (let i = 0; i < users.length; i++) {
        return posts.filter((todo) => todo.userId === id);
      }
    }
  }

  function deleteUser(id) {
    setUsers(users.filter((user) => user.id !== id));
    setPosts(posts.filter((post) => post.userId !== id));
    setTodos(todos.filter((todo) => todo.userId !== id));
  }

  //update search after deleting user
  useEffect(() => {
    if (isSearch) {
      search(querry);
    }
    setChoosedUser(0);
    if (firstLoad) {
      setLastUserId(
        users.length > 0
          ? lastUserId.concat(users[users.length - 1].id)
          : lastUserId.concat(Math.max.apply(null, lastUserId))
      );
    } else {
      setLastUserId(
        users.length > 0
        ? lastUserId.concat(Math.max.apply(null, lastUserId) + 1)
        : lastUserId.concat(Math.max.apply(null, lastUserId))
      )
    }
  }, [users]);
  



  function updateTodos(newTodos, id) {
    let a = todos.filter((todo) => todo.userId !== id);
    let b = a.concat(newTodos);
    b.sort((a, b) => (a.userId > b.userId ? 1 : b.userId > a.userId ? -1 : 0));
    setTodos(b);
  }

  function updatePosts(newPosts, id) {
    let a = posts.filter((post) => post.userId !== id);
    let b = a.concat(newPosts);
    b.sort((a, b) => (a.userId > b.userId ? 1 : b.userId > a.userId ? -1 : 0));
    setPosts(b);
  }

  function addUser(name, email) {
    let id = Math.max.apply(null, lastUserId) + 1;
    let obj = {
      id,
      name,
      email,
      address: {
        street: "",
        city: "",
        zipcode: "",
      },
    };
    let a = users.concat(obj);
    setUsers(a);
    setLastUserId(lastUserId.concat(id));
    setModalActive(false);
  }

  useEffect(()=>{
    if(lastUserId.length > 5){
      setLastUserId([Math.max.apply(null, lastUserId)])
    }
  },[lastUserId])

  return (
    <Context.Provider
      value={{
        search,
        saveUser,
        filterById,
        deleteUser,
        updateTodos,
        setChoosedUser,
        updatePosts,
      }}
    >
      <div className={bodyClass}>
        <header className="header">
          <div>
            <NavBar
              modalActive={modalActive}
              setModalActive={setModalActive}
              setChoosedUser={setChoosedUser}
            />
          </div>
        </header>
        <Modal modalActive={modalActive} setModalActive={setModalActive}>
          <NewUser
            setModalActive={setModalActive}
            addUser={addUser}
            setIsSearch={setIsSearch}
          />
        </Modal>
        <div className="page-foot">
          <ScrollToTop />
        </div>
        <div className="main" role="main">
          <div className="row">
            <div className="col mw-50 mw">
              <div className="users-section">
                <div>
                  {isLoading && <Loading />}
                  {!isLoading && !users.length && !isSearch && (
                    <Container
                      title={"No Users Found!"}
                      body={"You can always add new one!"}
                      foot={'Click "Add New" in right side of navbar'}
                    />
                  )}
                  {!isSearch && (
                    <div className="mb-3">
                      {users.map((user) => {
                        return (
                          <User
                            key={user.id}
                            userID={user.id}
                            user={user}
                            choosedUser={choosedUser}
                            setChoosedUser={setChoosedUser}
                            todos={todos}
                          />
                        );
                      })}
                    </div>
                  )}
                  {isSearch && !isLoading && (
                    <div className="search-result">
                      <div className="mt-3 border-bottom border-secondary">
                        <h1 style={{ color: "black", opacity: "50%" }}>
                          Search results
                        </h1>
                      </div>
                      <div>
                        {found.length !== 0 &&
                          found.map((user) => {
                            return (
                              <User
                                key={user.id}
                                userID={user.id}
                                user={user}
                                setChoosedUser={setChoosedUser}
                                choosedUser={choosedUser}
                                todos={todos}
                              />
                            );
                          })}
                        {!found.length && (
                          <Container
                            title={"No Users Found"}
                            body={`No users found by - ${querry}`}
                            foot={"Try again with another value"}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col mw-50 mw">
              <div className="edit-section sticky">
                <EditWindow todos={todos} posts={posts} userID={choosedUser} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Context.Provider>
  );
}

export default App;
