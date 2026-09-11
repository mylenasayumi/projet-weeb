// CreateArticle.test.jsx
import { render, screen, fireEvent, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import CreateArticle from "../CreateArticle";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => mockNavigate };
});
vi.mock("../../services/ArticlesService", () => ({
  default: { create: vi.fn() },
}));
vi.mock("../../languages/LanguageContext", () => ({
  useLanguage: () => ({ t: (k) => k }),
}));

import articleService from "../../services/ArticlesService";

function renderPage() {
  return render(
    <MemoryRouter>
      <CreateArticle />
    </MemoryRouter>
  );
}

describe("CreateArticle page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockNavigate.mockClear();
    localStorage.clear();
    vi.useFakeTimers();
  });
  afterEach(() => vi.useRealTimers());

  it("renders form fields when authenticated", () => {
    renderPage();
    expect(screen.getByPlaceholderText("articles.title")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("articles.description")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("articles.imagePlaceholder")
    ).toBeInTheDocument();
  });

  it("creates article and shows success then redirects", async () => {
    articleService.create.mockResolvedValue({ id: 1 });
    localStorage.setItem("access_token", "tok");
    renderPage();
    fireEvent.change(screen.getByPlaceholderText("articles.title"), {
      target: { value: "My Title" },
    });
    fireEvent.change(screen.getByPlaceholderText("articles.description"), {
      target: { value: "My Desc" },
    });
    fireEvent.click(screen.getByText("articles.createArticleSaveButton"));
    await act(async () => {});
    expect(
      screen.getByText("articles.createArticleSuccess")
    ).toBeInTheDocument();
    await act(async () => {
      vi.advanceTimersByTime(3000);
    });
    expect(mockNavigate).toHaveBeenCalledWith("/articles");
  });
});
