// LoginSection.test.jsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";

import LoginSection from "../users/login/LoginSection";

const mockNavigate = vi.fn();
const mockLogin = vi.fn();
const assignMock = vi.fn();
let mockSearch = "";
let mockIsAuthenticated = false;

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({
      search: mockSearch,
    }),
  };
});

vi.mock("../../languages/LanguageContext", () => ({
  useLanguage: () => ({
    t: (key) => key,
    lang: "en",
    changeLanguage: vi.fn(),
  }),
}));

vi.mock("../../contexts/AuthContext", () => ({
  useAuth: () => ({
    user: mockIsAuthenticated ? { id: 1, email: "mylena@gmail.com" } : null,
    isAuthenticated: mockIsAuthenticated,
    login: mockLogin,
    logout: vi.fn(),
    refreshUser: vi.fn(),
  }),
}));

describe("LoginSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    mockSearch = "";
    mockIsAuthenticated = false;
    window.history.replaceState({}, "", "/login");

    Object.defineProperty(window, "location", {
      writable: true,
      value: {
        ...window.location,
        assign: assignMock,
      },
    });
  });

  const renderComponent = () => {
    render(
      <MemoryRouter>
        <LoginSection />
      </MemoryRouter>
    );
  };

  it("renders inputs and button.", () => {
    renderComponent();

    expect(screen.getByPlaceholderText("login.email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("login.password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "login.loginButton" })
    ).toBeInTheDocument();
  });

  it("logs in and redirects", async () => {
    mockLogin.mockResolvedValue({
      id: 1,
      email: "mylena@gmail.com",
    });

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText("login.email"), {
      target: { value: "mylena@gmail.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("login.password"), {
      target: { value: "secret123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "login.loginButton" }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("mylena@gmail.com", "secret123");
    });

    expect(mockNavigate).toHaveBeenCalledWith("/", { replace: true });
  });

  it("displays an error if login fails.", async () => {
    mockLogin.mockRejectedValue(new Error("Invalid credentials"));

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText("login.email"), {
      target: { value: "mylena@gmail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("login.password"), {
      target: { value: "wrong" },
    });

    fireEvent.click(screen.getByRole("button", { name: "login.loginButton" }));

    expect(await screen.findByText("Invalid credentials")).toBeInTheDocument();
  });

  it("shows account created success message", () => {
    mockSearch = "?success=account_created";
    renderComponent();
    expect(screen.getByText("login.accountCreatedMessage")).toBeInTheDocument();
  });

  it("redirects to github auth on button click", () => {
    renderComponent();

    fireEvent.click(screen.getByRole("button", { name: "login.githubButton" }));

    expect(assignMock).toHaveBeenCalledWith(
      expect.stringContaining("/api/auth/github/")
    );
  });

  it("shows error if user fetch fails after login", async () => {
    mockLogin.mockRejectedValue(new Error("User fetch failed"));

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText("login.email"), {
      target: { value: "mylena@gmail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("login.password"), {
      target: { value: "secret123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "login.loginButton" }));

    expect(await screen.findByText("User fetch failed")).toBeInTheDocument();
  });

  it("shows github access denied error", () => {
    mockSearch = "?error=github_access_denied";

    renderComponent();

    expect(screen.getByText("github_access_denied")).toBeInTheDocument();
  });

  it("shows github no code error", () => {
    mockSearch = "?error=github_no_code";

    renderComponent();

    expect(screen.getByText("github_no_code")).toBeInTheDocument();
  });

  it("shows github token failed error", () => {
    mockSearch = "?error=github_token_failed";

    renderComponent();

    expect(screen.getByText("github_token_failed")).toBeInTheDocument();
  });

  it("shows github no email error", () => {
    mockSearch = "?error=github_no_email";

    renderComponent();

    expect(screen.getByText("github_no_email")).toBeInTheDocument();
  });

  it("shows fallback login error message when error is unknown", () => {
    mockSearch = "?error=unknown_error";

    renderComponent();

    expect(screen.getByText("unknown_error")).toBeInTheDocument();
  });
});
