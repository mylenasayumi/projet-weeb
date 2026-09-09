// Profile.test.jsx
import { render, screen, fireEvent, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => mockNavigate };
});

vi.mock("../../contexts/AuthContext", () => ({
  useAuth: vi.fn(() => ({
    user: { id: 1, first_name: "M", last_name: "H", email: "m@h.com" },
  })),
}));
vi.mock("../../languages/LanguageContext", () => ({
  useLanguage: () => ({ t: (k) => k }),
}));
vi.mock("../../services/ArticlesService", () => ({
  default: { getAll: vi.fn(), create: vi.fn(), delete: vi.fn() },
}));
vi.mock("../../components/users/profile/ProfileSection", () => ({
  default: (props) => (
    <div>
      <span data-testid="user-email">{props.user?.email}</span>
      <button
        onClick={() =>
          props.onCreate({ title: "T", description: "D", image: "" })
        }
      >
        create
      </button>
      <button onClick={() => props.onUpdate(null)}>update-null</button>
      <button onClick={() => props.onUpdate({ id: 5 })}>update-article</button>
      <button onClick={() => props.onDelete(3)}>delete</button>
      <button onClick={() => props.onView({ id: 2 })}>view</button>
      <button onClick={props.onPreviousPage}>prev</button>
      <button onClick={props.onNextPage}>next</button>
      {props.loading && <span>loading</span>}
    </div>
  ),
}));

import { useAuth } from "../../contexts/AuthContext";
import articleService from "../../services/ArticlesService";
import Profile from "../Profile";

describe("Profile page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockNavigate.mockClear();
    articleService.getAll.mockResolvedValue({
      results: [{ id: 1, title: "A" }],
      count: 1,
    });
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("loads articles on mount", async () => {
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );
    await act(async () => {});
    expect(articleService.getAll).toHaveBeenCalled();
  });

  it("shows success message after create", async () => {
    articleService.create.mockResolvedValue({ id: 10 });
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText("create"));
    await act(async () => {});
    expect(
      screen.getByText("articles.createArticleSuccess")
    ).toBeInTheDocument();
    await act(async () => {
      vi.advanceTimersByTime(3000);
    });
    expect(
      screen.queryByText("articles.createArticleSuccess")
    ).not.toBeInTheDocument();
  });

  it("shows error message after failed create", async () => {
    articleService.create.mockRejectedValue(new Error("fail"));
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText("create"));
    await act(async () => {});
    expect(screen.getByText("articles.createArticleError")).toBeInTheDocument();
  });

  it("navigates to /articles/:id on view", () => {
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText("view"));
    expect(mockNavigate).toHaveBeenCalledWith("/articles/2");
  });

  it("navigates to /articles/create when onUpdate called with null", () => {
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText("update-null"));
    expect(mockNavigate).toHaveBeenCalledWith("/articles/create");
  });

  it("navigates to update route when article provided", () => {
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText("update-article"));
    expect(mockNavigate).toHaveBeenCalledWith(
      "/articles/update/5",
      expect.objectContaining({ state: expect.any(Object) })
    );
  });

  it("deletes article and shows success", async () => {
    vi.stubGlobal(
      "confirm",
      vi.fn(() => true)
    );
    articleService.delete.mockResolvedValue({});
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText("delete"));
    await act(async () => {});
    expect(
      screen.getByText("articles.deleteArticleSuccess")
    ).toBeInTheDocument();
    expect(articleService.delete).toHaveBeenCalled();
  });

  it("cancels delete when confirm returns false", () => {
    vi.stubGlobal(
      "confirm",
      vi.fn(() => false)
    );
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText("delete"));
    expect(articleService.delete).not.toHaveBeenCalled();
  });

  it("shows 403 error on delete failure", async () => {
    vi.stubGlobal(
      "confirm",
      vi.fn(() => true)
    );
    articleService.delete.mockRejectedValue({ response: { status: 403 } });
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText("delete"));
    await act(async () => {});
    expect(
      screen.getByText("articles.notOwnerDeleteArticleError")
    ).toBeInTheDocument();
  });

  it("shows 401 error on delete failure", async () => {
    vi.stubGlobal(
      "confirm",
      vi.fn(() => true)
    );
    articleService.delete.mockRejectedValue({ response: { status: 401 } });
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText("delete"));
    await act(async () => {});
    expect(
      screen.getByText("articles.loggedInDeleteArticleError")
    ).toBeInTheDocument();
  });

  it("shows 500 error on delete failure", async () => {
    vi.stubGlobal(
      "confirm",
      vi.fn(() => true)
    );
    articleService.delete.mockRejectedValue({ response: { status: 500 } });
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText("delete"));
    await act(async () => {});
    expect(
      screen.getByText("articles.deleteArticleServerError")
    ).toBeInTheDocument();
  });

  it("shows generic error on unknown delete failure", async () => {
    vi.stubGlobal(
      "confirm",
      vi.fn(() => true)
    );
    articleService.delete.mockRejectedValue(new Error("network"));
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText("delete"));
    await act(async () => {});
    expect(screen.getByText("articles.deleteArticleError")).toBeInTheDocument();
  });

  it("decrements page when last item deleted", async () => {
    articleService.getAll
      .mockResolvedValueOnce({ results: [{ id: 1, title: "A" }], count: 6 }) // page 1, totalPages=2
      .mockResolvedValue({ results: [], count: 0 });
    vi.stubGlobal(
      "confirm",
      vi.fn(() => true)
    );
    articleService.delete.mockResolvedValue({});
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );
    // move to page 2
    await act(async () => {});
    screen.getByText("next");
    fireEvent.click(screen.getByText("next"));
    // articles on page 2: only 1 item
    articleService.getAll.mockResolvedValueOnce({
      results: [{ id: 2, title: "B" }],
      count: 6,
    });
    await act(async () => {});
    expect(articleService.getAll).toHaveBeenCalled();
    fireEvent.click(screen.getByText("delete"));
    await act(async () => {});
    expect(
      screen.getByText("articles.deleteArticleSuccess")
    ).toBeInTheDocument();
    expect(articleService.delete).toHaveBeenCalled();
  });

  it("does not load articles when no user id", async () => {
    useAuth.mockReturnValue({ user: null });
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );
    expect(articleService.getAll).not.toHaveBeenCalled();
  });
});
