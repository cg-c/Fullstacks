import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog />", () => {
  let container;

  beforeEach(() => {
    const user = {
      name: "Art",
      username: "root user",
      password: "12345",
    };

    const blog = {
      title: "Tester Blog",
      author: "Mr. Tester",
      url: "test.com",
      user: user,
    };

    container = render(<Blog blog={blog} />).container;
  });

  test("renders title & author by default", async () => {
    const div = container.querySelector(".hiddenBlog");
    expect(div).not.toHaveStyle("display: none");

    const div2 = container.querySelector(".fullBlog");
    expect(div2).toHaveStyle("display: none");
  });

  test("url & likes shown when button is clicked", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    const div = container.querySelector(".fullBlog");
    expect(div).not.toHaveStyle("display: none");
  });
});

describe("Blog Buttons", () => {
  test("clicking likes twice", async () => {
    const mockHandler = vi.fn();

    const person = {
      name: "Art",
      username: "root user",
      password: "12345",
    };

    const blog = {
      title: "Tester Blog",
      author: "Mr. Tester",
      url: "test.com",
      likes: 0,
      user: person,
    };

    let container = render(
      <Blog blog={blog} addLike={mockHandler} />,
    ).container;

    const user = userEvent.setup();
    const showButton = screen.getByText("view");
    await user.click(showButton);

    const div = container.querySelector(".hiddenBlog");
    expect(div).toHaveStyle("display: none");

    const likeButton = container.querySelector(".likeButton");
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
