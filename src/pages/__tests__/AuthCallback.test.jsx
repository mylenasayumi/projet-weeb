// AuthCallback.test.jsx
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { AuthProvider } from "../../contexts/AuthContext";
import authCallbackService from "../../services/AuthCallbackService";
import AuthCallback from "../AuthCallback";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => mockNavigate };
});

vi.mock("../../services/AuthCallbackService", () => ({
  default: { handleAuthCallback: vi.fn() },
}));

vi.mock("../../languages/LanguageContext", () => ({
  useLanguage: () => ({ t: (k) => k }),
}));

describe("AuthCallback", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockNavigate.mockClear();
  });

  const renderAuthCallback = () =>
    render(
      <MemoryRouter>
        <AuthProvider>
          <AuthCallback />
        </AuthProvider>
      </MemoryRouter>
    );

  it("shows authenticating text", async () => {
    authCallbackService.handleAuthCallback.mockResolvedValue({});
    renderAuthCallback();
    expect(await screen.findByText("auth.authentication")).toBeInTheDocument();
  });

  it("navigates to / on success", async () => {
    authCallbackService.handleAuthCallback.mockResolvedValue({
      email: "a@b.com",
    });
    renderAuthCallback();
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  it("navigates to /login?error= on failure", async () => {
    authCallbackService.handleAuthCallback.mockRejectedValue(
      new Error("github_access_denied")
    );
    renderAuthCallback();
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(
        "/login?error=github_access_denied"
      );
    });
  });
});
