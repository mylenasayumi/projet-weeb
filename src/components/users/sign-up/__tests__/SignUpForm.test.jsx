// SignUpForm.test.jsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";

import authService from "../../../../services/AuthService";
import SignUpForm from "../SignUpForm";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => mockNavigate };
});

vi.mock("../../../../services/AuthService", () => ({
  default: { register: vi.fn() },
}));

vi.mock("../../../../languages/LanguageContext", () => ({
  useLanguage: () => ({ t: (k) => k }),
}));

function renderForm() {
  return render(
    <MemoryRouter>
      <SignUpForm />
    </MemoryRouter>
  );
}

function fill() {
  fireEvent.change(screen.getByPlaceholderText("signUp.email"), {
    target: { name: "email", value: "a@b.com" },
  });
  fireEvent.change(screen.getByPlaceholderText("signUp.firstName"), {
    target: { name: "first_name", value: "A" },
  });
  fireEvent.change(screen.getByPlaceholderText("signUp.lastName"), {
    target: { name: "last_name", value: "B" },
  });
  fireEvent.change(screen.getByPlaceholderText("signUp.password"), {
    target: { name: "password", value: "pass1234" },
  });
}

describe("SignUpForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockNavigate.mockClear();
  });

  it("renders all fields and button", () => {
    renderForm();
    expect(screen.getByPlaceholderText("signUp.email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("signUp.firstName")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("signUp.lastName")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("signUp.password")).toBeInTheDocument();
    expect(screen.getByText("signUp.signUpButton")).toBeInTheDocument();
  });

  it("registers successfully and navigates to login", async () => {
    authService.register.mockResolvedValue({ id: 1 });
    renderForm();
    fill();
    fireEvent.click(screen.getByText("signUp.signUpButton"));
    await waitFor(() =>
      expect(mockNavigate).toHaveBeenCalledWith(
        "/login?success=account_created"
      )
    );
  });

  it("shows error when registration fails", async () => {
    authService.register.mockRejectedValue(new Error("Email taken"));
    renderForm();
    fill();
    fireEvent.click(screen.getByText("signUp.signUpButton"));
    expect(await screen.findByText("Email taken")).toBeInTheDocument();
  });

  it("shows fallback error when no message", async () => {
    authService.register.mockRejectedValue({});
    renderForm();
    fill();
    fireEvent.click(screen.getByText("signUp.signUpButton"));
    expect(await screen.findByText("signUp.errorMessage")).toBeInTheDocument();
  });

  it("clears error on next keystroke", async () => {
    authService.register.mockRejectedValue(new Error("fail"));
    renderForm();
    fill();
    fireEvent.click(screen.getByText("signUp.signUpButton"));
    await screen.findByText("fail");
    fireEvent.change(screen.getByPlaceholderText("signUp.email"), {
      target: { name: "email", value: "new@b.com" },
    });
    expect(screen.queryByText("fail")).not.toBeInTheDocument();
  });

  it("redirects to GitHub OAuth on button click", () => {
    const assignMock = vi.fn();
    Object.defineProperty(window, "location", {
      value: {
        assign: assignMock,
        href: "http://localhost:5173/",
      },
      writable: true,
    });
    renderForm();
    fireEvent.click(screen.getByText("signUp.githubButton"));
    expect(assignMock).toHaveBeenCalledWith(
      expect.stringContaining("/api/auth/github/")
    );
  });
});
