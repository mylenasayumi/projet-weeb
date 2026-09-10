// ScrollToTopButton.test.jsx
import {
  fireEvent,
  render,
  screen,
  act,
  waitFor,
} from "@testing-library/react";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";

import ScrollToTopButton from "../ScrollToTopButton";

vi.mock("../../../languages/LanguageContext", () => ({
  useLanguage: () => ({
    t: (key) => key,
  }),
}));

describe("ScrollToTopButton", () => {
  beforeEach(() => {
    vi.stubGlobal("scrollTo", vi.fn());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("does not render when scroll position is below the threshold", () => {
    Object.defineProperty(window, "scrollY", {
      configurable: true,
      value: 0,
    });

    render(<ScrollToTopButton />);

    expect(
      screen.queryByRole("button", {
        name: "navbar.scrollToTopButton",
      })
    ).not.toBeInTheDocument();
  });

  it("renders when the user scrolls past the threshold", () => {
    Object.defineProperty(window, "scrollY", {
      configurable: true,
      value: 301,
    });

    render(<ScrollToTopButton />);

    act(() => {
      fireEvent.scroll(window);
    });

    expect(
      screen.getByRole("button", {
        name: "navbar.scrollToTopButton",
      })
    ).toBeInTheDocument();
  });

  it("does not render at exactly the scroll threshold", () => {
    Object.defineProperty(window, "scrollY", {
      configurable: true,
      value: 300,
    });

    render(<ScrollToTopButton />);

    act(() => {
      fireEvent.scroll(window);
    });

    expect(
      screen.queryByRole("button", {
        name: "navbar.scrollToTopButton",
      })
    ).not.toBeInTheDocument();
  });

  it("hides when the user scrolls back above the threshold", async () => {
    Object.defineProperty(window, "scrollY", {
      configurable: true,
      value: 301,
    });

    render(<ScrollToTopButton />);

    act(() => {
      fireEvent.scroll(window);
    });

    expect(
      screen.getByRole("button", {
        name: "navbar.scrollToTopButton",
      })
    ).toBeInTheDocument();

    Object.defineProperty(window, "scrollY", {
      configurable: true,
      value: 100,
    });

    act(() => {
      fireEvent.scroll(window);
    });

    await waitFor(() => {
      expect(
        screen.queryByRole("button", {
          name: "navbar.scrollToTopButton",
        })
      ).not.toBeInTheDocument();
    });
  });

  it("scrolls smoothly to the top when clicked", () => {
    Object.defineProperty(window, "scrollY", {
      configurable: true,
      value: 301,
    });

    render(<ScrollToTopButton />);

    act(() => {
      fireEvent.scroll(window);
    });

    const button = screen.getByRole("button", {
      name: "navbar.scrollToTopButton",
    });

    fireEvent.click(button);

    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });

  it("removes the scroll event listener on unmount", () => {
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");

    const { unmount } = render(<ScrollToTopButton />);

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function)
    );
  });
});
