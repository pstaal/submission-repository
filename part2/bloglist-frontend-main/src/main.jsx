import ReactDOM from "react-dom/client";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import blogService from "./services/blogs";
import { Provider } from "react-redux";
import "../index.css";

import notificationReducer from "./reducers/notificationReducer";
import blogReducer from "./reducers/blogReducer";
import userReducer from "./reducers/userReducer";
import { setBlogs } from "./reducers/blogReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    user: userReducer,
  },
});

blogService.getAll().then((blogs) => store.dispatch(setBlogs(blogs)));

let root = ReactDOM.createRoot(document.getElementById("root"));

const renderDOM = () => {
  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

renderDOM();

store.subscribe(renderDOM);
