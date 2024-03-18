import Togglable from "./Togglable";
import BlogForm from "./BlogForm";
import Blog from "./Blog";

const BlogView = ({ handleAddBlog, blogs, updateBlog, removeBlog }) => {
  return (
    <>
      <Togglable buttonLabel="create new blog">
        <BlogForm handleAddBlog={handleAddBlog} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          removeBlog={removeBlog}
        />
      ))}
    </>
  );
};

export default BlogView;
