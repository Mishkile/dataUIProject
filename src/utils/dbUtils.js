import axios from "axios";
import propTypes from "prop-types";

async function getUserData(userID, action) {
  const USERS_URL = "https://jsonplaceholder.typicode.com/users";
  const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";
  const TODOS_URL = "https://jsonplaceholder.typicode.com/todos";

  if (action === "__GET_ALL__" && typeof userID === "number") {
    try {
      const USER = await axios.get(`${USERS_URL}`);
      const POSTS = await axios.get(`${POSTS_URL}`)
      const TODOS = await axios.get(`${TODOS_URL}`)
      return {
        users: USER.data,
        posts: POSTS.data,
        todos: TODOS.data
      }
    } catch (e) {
      return e
    }
  } else if (typeof userID === "number") {
    try {
      const USER = await axios.get(`${USERS_URL}/${userID}`);
      const POSTS = await axios.get(`${POSTS_URL}?userId=${userID}&_limit=3`);
      const TODOS = await axios.get(`${TODOS_URL}?userId=${userID}&_limit=3`);

      return {
        user: USER.data,
        posts: POSTS.data,
        todos: TODOS.data,
      };
    } catch (e) {
      return e;

    }
  }
}

getUserData.PropTypes = {
  userID: propTypes.number.isRequired,
  action: propTypes.string,
};

export default getUserData;
