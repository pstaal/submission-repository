import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    createBlog(state, action) {
      state.push(action.payload);
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    likeBlog(state, action) {
      let id = action.payload.id;
      const blogToUpdate = state.find((b) => b.id === id);
      const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 };
      return state.map((blog) => (blog.id !== id ? blog : updatedBlog));
    },
    setBlogs(state, action) {
      return action.payload;
    },
    deleteBlog(state, action) {
      let id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
  },
});

export const { createBlog, appendBlog, setBlogs, likeBlog, deleteBlog } =
  blogSlice.actions;
export default blogSlice.reducer;
