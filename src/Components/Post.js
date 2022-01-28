import React from "react";
import { useEffect, useState } from "react/cjs/react.development";

export default function Post({ post }) {
  const [bodyTxt, setBodyTxt] = useState([]);
  const [titleTxt, setTitleTxt] = useState([]);

  useEffect(() => {
    setBodyTxt(post.body);
    setTitleTxt(post.title);
  }, []);

  useEffect(() => {
    let a = post.title
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
      .join(" ");
    setTitleTxt(a);
  }, []);

  return (
    <>
      <div className="todo-container">
        <div className="row">
          <div className="col">
            <div className="body">
              <div className="post-title-container">
                <p className="post-title ">{titleTxt}</p>
                <hr />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div></div>
              <div className="post-body">{bodyTxt}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
