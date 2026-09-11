// ArticleModal.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import ArticleModal from "../ArticleModal";

vi.mock("../../../languages/LanguageContext", () => ({
  useLanguage: () => ({ t: (k) => k }),
}));

const baseArticle = {
  id: 1,
  title: "My Article",
  description: "Desc",
  user: 42,
  views: 10,
  image: null,
  author: null,
  likes_count: 3,
};

describe("ArticleModal", () => {
  it("renders article title and description", () => {
    render(
      <ArticleModal
        article={baseArticle}
        currentUser={null}
        onClose={vi.fn()}
        onUpdate={vi.fn()}
        onDelete={vi.fn()}
      />
    );
    expect(screen.getByText("My Article")).toBeInTheDocument();
    expect(screen.getByText("Desc")).toBeInTheDocument();
  });

  it("shows 'User #42' when no author", () => {
    render(
      <ArticleModal
        article={baseArticle}
        currentUser={null}
        onClose={vi.fn()}
        onUpdate={vi.fn()}
        onDelete={vi.fn()}
      />
    );
    expect(screen.getByText(/User #42/)).toBeInTheDocument();
  });

  it("shows author name when author is provided", () => {
    const article = {
      ...baseArticle,
      author: { first_name: "Mylena", last_name: "H" },
    };
    render(
      <ArticleModal
        article={article}
        currentUser={null}
        onClose={vi.fn()}
        onUpdate={vi.fn()}
        onDelete={vi.fn()}
      />
    );
    expect(screen.getByText(/Mylena H/)).toBeInTheDocument();
  });

  it("shows edit/delete buttons for owner", () => {
    render(
      <ArticleModal
        article={baseArticle}
        currentUser={{ id: 42 }}
        onClose={vi.fn()}
        onUpdate={vi.fn()}
        onDelete={vi.fn()}
      />
    );
    expect(screen.getByText("articles.edit")).toBeInTheDocument();
    expect(screen.getByText("articles.delete")).toBeInTheDocument();
  });

  it("hides edit/delete buttons for non-owner", () => {
    render(
      <ArticleModal
        article={baseArticle}
        currentUser={{ id: 99 }}
        onClose={vi.fn()}
        onUpdate={vi.fn()}
        onDelete={vi.fn()}
      />
    );
    expect(screen.queryByText("articles.edit")).not.toBeInTheDocument();
  });

  it("calls onClose when close button clicked", () => {
    const onClose = vi.fn();
    render(
      <ArticleModal
        article={baseArticle}
        currentUser={null}
        onClose={onClose}
        onUpdate={vi.fn()}
        onDelete={vi.fn()}
      />
    );
    fireEvent.click(
      screen
        .getAllByRole("button")
        .find(
          (b) =>
            (b.closest("button") && b.querySelector("svg")) ||
            b.tagName === "BUTTON"
        )
    );
    expect(onClose).toHaveBeenCalled();
  });

  it("calls onClose when backdrop clicked", () => {
    const onClose = vi.fn();
    const { container } = render(
      <ArticleModal
        article={baseArticle}
        currentUser={null}
        onClose={onClose}
        onUpdate={vi.fn()}
        onDelete={vi.fn()}
      />
    );
    fireEvent.click(container.firstChild);
    expect(onClose).toHaveBeenCalled();
  });

  it("does not close when inner content clicked", () => {
    const onClose = vi.fn();
    render(
      <ArticleModal
        article={baseArticle}
        currentUser={null}
        onClose={onClose}
        onUpdate={vi.fn()}
        onDelete={vi.fn()}
      />
    );
    fireEvent.click(screen.getByText("My Article"));
    expect(onClose).not.toHaveBeenCalled();
  });

  it("calls onUpdate when edit clicked", () => {
    const onUpdate = vi.fn();
    render(
      <ArticleModal
        article={baseArticle}
        currentUser={{ id: 42 }}
        onClose={vi.fn()}
        onUpdate={onUpdate}
        onDelete={vi.fn()}
      />
    );
    fireEvent.click(screen.getByText("articles.edit"));
    expect(onUpdate).toHaveBeenCalledWith(baseArticle);
  });

  it("calls onDelete when delete clicked", () => {
    const onDelete = vi.fn();
    render(
      <ArticleModal
        article={baseArticle}
        currentUser={{ id: 42 }}
        onClose={vi.fn()}
        onUpdate={vi.fn()}
        onDelete={onDelete}
      />
    );
    fireEvent.click(screen.getByText("articles.delete"));
    expect(onDelete).toHaveBeenCalledWith(1);
  });

  it("shows image when article has image", () => {
    const article = { ...baseArticle, image: "https://img.com/x.png" };
    render(
      <ArticleModal
        article={article}
        currentUser={null}
        onClose={vi.fn()}
        onUpdate={vi.fn()}
        onDelete={vi.fn()}
      />
    );
    expect(screen.getByAltText("My Article")).toBeInTheDocument();
  });

  it("shows 'articles.noContent' when no description", () => {
    const article = { ...baseArticle, description: "" };
    render(
      <ArticleModal
        article={article}
        currentUser={null}
        onClose={vi.fn()}
        onUpdate={vi.fn()}
        onDelete={vi.fn()}
      />
    );
    expect(screen.getByText("articles.noContent")).toBeInTheDocument();
  });

  it("handles author with empty names gracefully", () => {
    const article = {
      ...baseArticle,
      author: { first_name: "", last_name: "" },
    };
    render(
      <ArticleModal
        article={article}
        currentUser={null}
        onClose={vi.fn()}
        onUpdate={vi.fn()}
        onDelete={vi.fn()}
      />
    );
    // Falls back to "Unknown" when trimmed name is empty
    expect(screen.getByText("Unknown")).toBeInTheDocument();
  });
});
