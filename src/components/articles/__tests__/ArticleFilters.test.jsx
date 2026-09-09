// ArticleFilters.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import ArticleFilters from "../ArticleFilters";

vi.mock("../../../languages/LanguageContext", () => ({
  useLanguage: () => ({ t: (k) => k }),
}));

describe("ArticleFilters", () => {
  const defaults = {
    search: "",
    onSearchChange: vi.fn(),
    onSearchSubmit: vi.fn(),
    onOrderingChange: vi.fn(),
  };

  it("renders search input", () => {
    render(<ArticleFilters {...defaults} />);
    expect(
      screen.getByPlaceholderText("articles.searchByTitle")
    ).toBeInTheDocument();
  });

  it("calls onSearchChange when typing", () => {
    render(<ArticleFilters {...defaults} />);
    fireEvent.change(screen.getByPlaceholderText("articles.searchByTitle"), {
      target: { value: "react" },
    });
    expect(defaults.onSearchChange).toHaveBeenCalledWith("react");
  });

  it("calls onSearchSubmit on Enter key", () => {
    render(<ArticleFilters {...defaults} />);
    fireEvent.keyDown(screen.getByPlaceholderText("articles.searchByTitle"), {
      key: "Enter",
    });
    expect(defaults.onSearchSubmit).toHaveBeenCalled();
  });

  it("does not call onSearchSubmit on non-Enter key", () => {
    const onSearchSubmit = vi.fn();
    render(<ArticleFilters {...defaults} onSearchSubmit={onSearchSubmit} />);
    fireEvent.keyDown(screen.getByPlaceholderText("articles.searchByTitle"), {
      key: "a",
    });
    expect(onSearchSubmit).not.toHaveBeenCalled();
  });

  it("calls onSearchSubmit when search button clicked", () => {
    render(<ArticleFilters {...defaults} />);
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[0]);
    expect(defaults.onSearchSubmit).toHaveBeenCalled();
  });

  it("calls onOrderingChange with title when asc button clicked", () => {
    render(<ArticleFilters {...defaults} />);
    const orderBtns = screen.getAllByRole("button");
    fireEvent.click(orderBtns[1]);
    expect(defaults.onOrderingChange).toHaveBeenCalledWith("title");
  });

  it("calls onOrderingChange with -title when desc button clicked", () => {
    render(<ArticleFilters {...defaults} />);
    const orderBtns = screen.getAllByRole("button");
    fireEvent.click(orderBtns[2]);
    expect(defaults.onOrderingChange).toHaveBeenCalledWith("-title");
  });
});
