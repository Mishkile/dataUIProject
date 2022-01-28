import React, { useContext, useState, useEffect } from "react";
import Context from "../context";
import Post from "./Post";

export default function Posts({
  userID,
  createNew,
  childToParentPost,
  posts,
  handleSetCreateNew,
}) {
  const { filterById } = useContext(Context);

  const [postsList, setPostsList] = useState([]);

  useEffect(() => {
    setPostsList(filterById(userID, "_posts"));
  }, [userID]);

  useEffect(() => {
    childToParentPost(postsList);
  }, [createNew]);

  useEffect(() => {
    setPostsList(filterById(userID, "_posts"));
    if (createNew) {
      handleSetCreateNew();
    }
  }, [posts]);

  return (
    <>
      {postsList.map((post, index) => {
        return <Post post={post} key={index} id={index} />;
      })}

      {postsList.length === 0 && (
        <div className="edit-body">
          <div className="container-text">
            <h3 className="title not-select">No Posts yet!</h3>
            <p className="text not-select">You always can create one!</p>
          </div>
        </div>
      )}
    </>
  );
}
