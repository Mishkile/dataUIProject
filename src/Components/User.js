import React, { useEffect, useState, useContext } from "react";
import Context from "../context";

export default function User({
  userID,
  user,
  setChoosedUser,
  choosedUser,
  todos,
}) {
  const { saveUser, deleteUser } = useContext(Context);

  const [isShowAdress, setIsShowAddress] = useState(false);
  const [completedTask, setCompletedTask] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userStreet, setUserStreet] = useState("");
  const [userCity, setUserCity] = useState("");
  const [userZip, setUserZip] = useState("");
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    taskCompletedCheck()
    classesHandler();
  }, [choosedUser, userID, completedTask, todos, user]);

  function classesHandler() {
    if (choosedUser === userID && completedTask) {
      setClasses("w-100 completedTasks d-block section-content o-100");
    } else if (choosedUser === userID && !completedTask) {
      setClasses("w-100 notCompletedTasks d-block section-content o-100");
    } else if (choosedUser !== userID && completedTask) {
      setClasses("w-100 completedTasks d-block section-content o-50");
    } else if (choosedUser !== userID && !completedTask) {
      setClasses("w-100 notCompletedTasks d-block section-content o-50");
    }
  }

  useEffect(() => {
    setUserName(user.name);
    setUserEmail(user.email);
    setUserStreet(user.address.street);
    setUserCity(user.address.city);
    setUserZip(user.address.zipcode);
  }, []);

  function taskCompletedCheck() {
    const isCompleted = todos
      .filter((todo) => todo.userId === userID)
      .every((todo) => todo.completed === true);
    if (isCompleted) {
      setCompletedTask(true);
    } else {
      setCompletedTask(false);
    }
  }

  useEffect(() => {
    if (choosedUser !== 0) taskCompletedCheck();
  }, [todos]);

  const showAddressOnMouse = (e) => {
    e.preventDefault();
    setIsShowAddress(true);
  };

  const showAddressOnClick = (e) => {
    e.preventDefault();
    setIsShowAddress(false);
  };

  function updateUser() {
    checkForUpdate();
    const updatedUser = {
      ...user,
      name: userName,
      email: userEmail,
      address: {
        street: userStreet,
        city: userCity,
        zipcode: userZip,
      },
    };
    saveUser(updatedUser, userID);
  }

  function checkForUpdate() {
    if (userName === "") {
      setUserName(user.name);
    }
    if (userEmail === "") {
      setUserEmail(user.email);
    }
    if (userStreet === "") {
      setUserStreet(user.address.street);
    }
    if (userCity === "") {
      setUserCity(user.address.city);
    }
    if (userZip === "") {
      setUserZip(user.address.zipcode);
    }
  }

  return (
    <section className={classes}>
      <div className="user-head">
        <div className="row ">
          <div className="col-md-auto pt-4">
            <div className="dot"  style={{cursor: 'pointer'}} onClick={() => setChoosedUser(userID)}>
              <span className="dot-text not-select">ID {userID}</span>
            </div>
            <div>
              <span className="not-select">Tasks</span>
              {completedTask && <span className="green-dot"></span>}
              {!completedTask && <span className="red-dot"></span>}
              <div></div>
            </div>
          </div>
          <div className="col name-email-container ">
            <div id="name-email-inputs">
              <div className="d-flex justify-content-center">
                <span className="o-50 not-select">Name:</span>
                <input
                  type="text"
                  className="input-lower-border mt-0"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="d-flex justify-content-center">
                <span className="o-50 not-select">Email:</span>
                <input
                  type="text"
                  value={userEmail}
                  className="input-lower-border mt-0"
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer
        className={
          isShowAdress
            ? "d-block justify-content-between mt-3"
            : "d-flex justify-content-between mt-3"
        }
      >
        <div id="other_data_btn">
          <button
            className="btn-gray d-fixed not-select"
            onMouseOver={showAddressOnMouse}
            onClick={showAddressOnClick}
            style={{ padding: "7px 5px" }}
          >
            Other Data
          </button>
          {isShowAdress && (
            <div className="center streetInfo mt-3 mb-3">
              <div>
                <span className="o-50 not-select" id="inputGroup-sizing-sm">
                  Street:
                </span>
              </div>
              <input
                type="text"
                className="input-lower-border"
                value={userStreet}
                onChange={(e) => setUserStreet(e.target.value)}
              />

              <div>
                <span className="o-50 not-select" id="inputGroup-sizing-sm">
                  City:
                </span>
                <input
                  type="text"
                  value={userCity}
                  className="input-lower-border"
                  onChange={(e) => setUserCity(e.target.value)}
                />
              </div>
              <div>
                <span className="o-50 not-select" id="inputGroup-sizing-sm">
                  Zip Code:
                </span>
                <input
                  type="text"
                  value={userZip}
                  onChange={(e) => setUserZip(e.target.value)}
                  className="input-lower-border"
                />
              </div>
            </div>
          )}
        </div>
        <div className="btn-group" role="group">
          <button className="btn btn-green not-select" onClick={updateUser.bind(null)}>
            Update
          </button>
          <button className="btn btn-red not-select" onClick={() => deleteUser(userID)}>
            Delete
          </button>
        </div>
      </footer>
    </section>
  );
}
