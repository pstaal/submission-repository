import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("blog renders the author", () => {
  const blog = {
    title: "A test blog title",
    author: "Peter Staal",
    url: "www.nu.nl",
    likes: 0,
    user: {
      id: 12,
      username: "peter",
      name: "peter",
    },
  };

  const updateBlog = () => {};
  const removeBlog = () => {};

  render(<Blog blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} />);
  const element = screen.getByText("Peter Staal", { exact: false });
  expect(element).toBeDefined();
});

test("blog renders the title", () => {
  const blog = {
    title: "A test blog title",
    author: "Peter Staal",
    url: "www.nu.nl",
    likes: 0,
    user: {
      id: 12,
      username: "peter",
      name: "peter",
    },
  };

  const updateBlog = () => {};
  const removeBlog = () => {};

  render(<Blog blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} />);
  const element = screen.getByText("A test blog title", { exact: false });
  expect(element).toBeDefined();
});

test("bottom part of the blog details are not visible when blog renders", () => {
  const blog = {
    title: "A test blog title",
    author: "Peter Staal",
    url: "www.nu.nl",
    likes: 0,
    user: {
      id: 12,
      username: "peter",
      name: "peter",
    },
  };

  const updateBlog = () => {};
  const removeBlog = () => {};

  const { container } = render(
    <Blog blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} />
  );
  const div = container.querySelector(".testBlogVisible");
  expect(div).toHaveStyle("display: none");
});

test("bottom part of the blog details are shown after button view is clicked", async () => {
  const blog = {
    title: "A test blog title",
    author: "Peter Staal",
    url: "www.nu.nl",
    likes: 0,
    user: {
      id: 12,
      username: "peter",
      name: "peter",
    },
  };

  const user = userEvent.setup();

  const updateBlog = () => {};
  const removeBlog = () => {};

  let { container } = render(
    <Blog blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} />
  );

  const viewButton = screen.getByText("view");
  await user.click(viewButton);

  const div = container.querySelector(".testBlogVisible");
  expect(div).toHaveStyle("display: block");
});

test("when the like button is clicked twice the event handler is also triggered twice", async () => {
  const blog = {
    title: "A test blog title",
    author: "Peter Staal",
    url: "www.nu.nl",
    likes: 0,
    user: {
      id: 12,
      username: "peter",
      name: "peter",
    },
  };

  const user = userEvent.setup();
  const mockHandler = vi.fn();

  const removeBlog = () => {};

  let { container } = render(
    <Blog blog={blog} updateBlog={mockHandler} removeBlog={removeBlog} />
  );

  const likeButton = screen.getByText("like");
  await user.click(likeButton);
  await user.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
