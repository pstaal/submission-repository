import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import BlogView from "./components/BlogView";
import SingleBlog from "./components/SingleBlog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import {
  setNotification,
  resetNotification,
} from "./reducers/notificationReducer";
import { createBlog, likeBlog, deleteBlog } from "./reducers/blogReducer";
import { setUser, removeUser } from "./reducers/userReducer";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Users from "./components/Users";
import User from "./components/User";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const message = useSelector((state) => state.notification);
  const blogs = useSelector((state) =>
    [...state.blogs].sort((a, b) => b.likes - a.likes)
  );
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(setNotification("Wrong credentials"));
      setTimeout(() => {
        dispatch(resetNotification());
      }, 5000);
    }
  };

  const updateBlog = async (newBlog, id) => {
    try {
      const blog = await blogService.update(newBlog, id);
      dispatch(likeBlog(blog));
    } catch (exception) {}
  };

  const removeBlog = async (id) => {
    try {
      await blogService.removeBlog(id);
      dispatch(deleteBlog(id));
    } catch (exception) {}
  };

  const handleAddBlog = async (title, author, url) => {
    try {
      const blog = await blogService.create({
        title,
        author,
        url,
      });

      dispatch(createBlog(blog));
    } catch (exception) {
      dispatch(setNotification("Missing required values"));
      setTimeout(() => {
        dispatch(resetNotification());
      }, 5000);
    }
  };

  const handleLogout = () => {
    dispatch(removeUser());
    window.localStorage.removeItem("loggedBlogappUser");
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <Router>
        <h2>blogs</h2>
        <Notification message={message} />
        <p
          style={{
            width: "100%",
            backgroundColor: "lightgrey",
            height: "30px",
          }}
        >
          <Link to="/">blogs</Link>
          <Link to="/users">users</Link>
          {user.name} logged-in<button onClick={handleLogout}>logout</button>
        </p>

        <Routes>
          <Route path="/users/:id" element={<User users={users} />} />
          <Route path="/users" element={<Users users={users} />} />
          <Route
            path="/blogs/:id"
            element={<SingleBlog blogs={blogs} updateBlog={updateBlog} />}
          />
          <Route
            path="/"
            element={
              <BlogView
                blogs={blogs}
                handleAddBlog={handleAddBlog}
                updateBlog={updateBlog}
                removeBlog={removeBlog}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
