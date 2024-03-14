import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("when form gets submitted it contains all the blog details", async () => {
  const mockHandler = vi.fn();

  render(<BlogForm handleAddBlog={mockHandler} />);

  const titleInput = screen.getByPlaceholderText("please provide a title");
  const authorInput = screen.getByPlaceholderText("please provide an author");
  const urlInput = screen.getByPlaceholderText("please provide a url");

  const user = userEvent.setup();

  fireEvent.change(titleInput, { target: { value: "Testboek" } });
  fireEvent.change(authorInput, { target: { value: "Peter Staal" } });
  fireEvent.change(urlInput, { target: { value: "www.google.com" } });

  const submitButton = screen.getByText("create");
  await user.click(submitButton);

  expect(mockHandler.mock.calls[0][0]).toBe("Testboek");
  expect(mockHandler.mock.calls[0][1]).toBe("Peter Staal");
  expect(mockHandler.mock.calls[0][2]).toBe("www.google.com");
});
