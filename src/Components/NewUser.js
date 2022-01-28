import React, { useState } from "react";
import xSymbol from "../assets/image/x-symbol.png";

export default function NewUser({ setModalActive, addUser, setIsSearch }) {
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  function add() {
    if (newName.length && newEmail.length) {
      addUser(newName, newEmail);
      setNewName("");
      setNewEmail("");
      setIsSearch(false)
    }
  }

  function addByEnter(e) {
    if (e.key === "Enter" && newName.length && newEmail.length) {
      addUser(newName, newEmail);
      setNewName("");
      setNewEmail("");
      setIsSearch(false)
    }
  }

  return (
    <>
      <div className="row">
        <div className="col">
          <div className="modal-head">
            <div></div>
            <div>
              <p className="not-select">add new user</p>
            </div>
            <div className="edit-head-btn">
              <button
                onClick={() => setModalActive(false)}
                className="edit-title-btn"
              >
                <img src={xSymbol} className="edit-title-img" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="modal-body">
            <div>
              <p className="modal-body-title not-select">
                Please Fill The Forms
              </p>
              <hr className="modal-body-title" />
            </div>
            <div className="modal-inputs-box">
              <label htmlFor="name" className="not-select">
                Name:
                <input
                  type="text"
                  id="name"
                  className="modal-inputs "
                  placeholder="Enter name..."
                  value={newName}
                  onKeyPress={(e) => addByEnter(e)}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </label>
              <label htmlFor="email" className="not-select">
                E-mail:
                <input
                  type="text"
                  id="email"
                  className="modal-inputs"
                  placeholder="Enter E-mail..."
                  value={newEmail}
                  onKeyPress={(e) => addByEnter(e)}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </label>
              <p className="modal-body-foot-text not-select">
                Don't Forget To Check All Info!
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="modal-foot">
            <div>
              <button className="btn-green ml-2" onClick={() => add(null)}>
                Add
              </button>
              <button className="btn-red" onClick={() => setModalActive(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
