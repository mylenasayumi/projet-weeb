// UpdateArticle.test.jsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import UpdateArticle from "../../pages/UpdateArticle";
import articleService from "../../services/ArticlesService";

const mockNavigate = vi.fn();
const mockLogout = vi.fn();
const tMock = vi.fn((key) => key);
let mockUser = { id: 1, email: "mylena@gmail.com" };
let mockId = "10";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ id: mockId }),
    useLocation: () => ({ state: null }),
  };
});

vi.mock("../../services/ArticlesService", () => ({
  default: {
    getById: vi.fn(),
    update: vi.fn(),
  },
}));

vi.mock("../../contexts/AuthContext", () => ({
  useAuth: () => ({
    user: mockUser,
    logout: mockLogout,
  }),
}));

vi.mock("../../languages/LanguageContext", () => ({
  useLanguage: () => ({
    t: tMock,
    lang: "en",
    changeLanguage: vi.fn(),
  }),
}));

describe("UpdateArticle", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockId = "10";
    mockUser = { id: 1, email: "mylena@gmail.com" };

    articleService.getById.mockResolvedValue({
      id: 10,
      title: "Old title",
      description: "Old description",
      user: 1,
    });

    vi.stubGlobal(
      "confirm",
      vi.fn(() => true)
    );
  });

  it("renders form with article data", async () => {
    render(<UpdateArticle />);

    expect(await screen.findByDisplayValue("Old title")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Old description")).toBeInTheDocument();
  });

  it("sends update", async () => {
    articleService.update.mockResolvedValue({});

    render(<UpdateArticle />);

    const titleInput = await screen.findByDisplayValue("Old title");

    fireEvent.change(titleInput, {
      target: { name: "title", value: "New title" },
    });

    const button = await screen.findByRole("button", {
      name: "articles.updateArticleSaveButton",
    });

    fireEvent.click(button);

    await waitFor(() => {
      expect(articleService.update).toHaveBeenCalledWith("10", {
        title: "New title",
        description: "Old description",
        image: "",
      });
    });

    expect(mockNavigate).toHaveBeenCalledWith("/articles", {
      state: { fromUpdate: true },
    });
  });

  it("redirects to /articles when article id is missing", async () => {
    mockId = undefined;

    render(<UpdateArticle />);

    expect(
      await screen.findByText("articles.articleDataMissingError")
    ).toBeInTheDocument();
  });

  it("shows error when user is not authenticated", async () => {
    mockUser = null;

    render(<UpdateArticle />);

    await screen.findByDisplayValue("Old title");

    fireEvent.click(
      screen.getByRole("button", {
        name: "articles.updateArticleSaveButton",
      })
    );

    await waitFor(() => {
      expect(articleService.update).not.toHaveBeenCalled();
    });
  });

  it("shows error when user is not the owner of the article", async () => {
    mockUser = { id: 999, email: "other@gmail.com" };

    render(<UpdateArticle />);

    await waitFor(() => {
      expect(
        screen.getByText("articles.notOwnerUpdateArticleError")
      ).toBeInTheDocument();
    });
  });

  it("does not update when user cancels confirmation", async () => {
    vi.stubGlobal(
      "confirm",
      vi.fn(() => false)
    );

    render(<UpdateArticle />);

    fireEvent.click(
      await screen.findByRole("button", {
        name: "articles.updateArticleSaveButton",
      })
    );

    expect(articleService.update).not.toHaveBeenCalled();
  });

  it("shows owner error when status 403", async () => {
    articleService.update.mockRejectedValue({
      response: { status: 403 },
    });

    render(<UpdateArticle />);

    fireEvent.click(
      await screen.findByRole("button", {
        name: "articles.updateArticleSaveButton",
      })
    );

    await waitFor(() => {
      expect(
        screen.getByText("articles.notOwnerUpdateArticleError")
      ).toBeInTheDocument();
    });
  });

  it("logs out and redirects when status 401", async () => {
    articleService.update.mockRejectedValue({
      response: { status: 401 },
    });

    render(<UpdateArticle />);

    fireEvent.click(
      await screen.findByRole("button", {
        name: "articles.updateArticleSaveButton",
      })
    );

    expect(
      await screen.findByText("articles.loggedInUpdateArticleError")
    ).toBeInTheDocument();
    expect(mockLogout).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  it("shows an error on unexpected failure", async () => {
    articleService.update.mockRejectedValue(new Error("boom"));

    render(<UpdateArticle />);

    fireEvent.click(
      await screen.findByRole("button", {
        name: "articles.updateArticleSaveButton",
      })
    );

    expect(
      await screen.findByText("articles.updateArticleError")
    ).toBeInTheDocument();
  });
});
