import { useParams } from "react-router-dom";

const SingleBlog = ({ blogs, updateBlog }) => {
  const id = useParams().id;
  const blog = blogs.find((b) => b.id === id);

  if (!blog) {
    return null;
  }

  const addLike = () => {
    let newBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    };

    updateBlog(newBlog, blog.id);
  };

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.url}</p>
      <p>
        {blog.likes} likes <button onClick={addLike}>like</button>
      </p>
      <p>Added by {blog.user.name}</p>
    </div>
  );
};

export default SingleBlog;
