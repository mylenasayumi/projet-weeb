// AuthContext.test.jsx
import { render, screen, act, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import authService from "../../services/AuthService";
import authTokenService from "../../services/AuthTokenService";
import { AuthProvider, useAuth } from "../AuthContext";

vi.mock("../../services/AuthService", () => ({
  default: { getCurrentUser: vi.fn() },
}));
vi.mock("../../services/AuthTokenService", () => ({
  default: {
    isAuthenticated: vi.fn(),
    login: vi.fn(),
    logout: vi.fn(),
    clearSession: vi.fn(),
  },
}));

function Consumer() {
  const auth = useAuth();
  return (
    <div>
      <span data-testid="user">{auth.user ? auth.user.email : "null"}</span>
      <span data-testid="authenticated">{String(auth.isAuthenticated)}</span>
      <button onClick={() => auth.login("mylena@gmail.com", "pass")}>
        login
      </button>
      <button onClick={() => auth.logout()}>logout</button>
      <button onClick={() => auth.refreshUser()}>refresh</button>
      <button onClick={() => auth.clearAuth()}>clearAuth</button>
      <button
        onClick={() => auth.setAuthenticatedUser({ email: "set@gmail.com" })}
      >
        setUser
      </button>
    </div>
  );
}

describe("AuthContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("initialises as unauthenticated when no token", async () => {
    authTokenService.isAuthenticated.mockReturnValue(false);
    authTokenService.clearSession.mockImplementation(() => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");
    });

    await act(async () => {
      render(
        <AuthProvider>
          <Consumer />
        </AuthProvider>
      );
    });

    expect(screen.getByTestId("authenticated").textContent).toBe("false");
  });

  it("loads user when token is present", async () => {
    authTokenService.isAuthenticated.mockReturnValue(true);
    authService.getCurrentUser.mockResolvedValue({ email: "mylena@gmail.com" });

    await act(async () => {
      render(
        <AuthProvider>
          <Consumer />
        </AuthProvider>
      );
    });

    await waitFor(() => {
      expect(screen.getByTestId("user").textContent).toBe("mylena@gmail.com");
    });
  });

  it("clears auth when getCurrentUser throws on init", async () => {
    authTokenService.isAuthenticated.mockReturnValue(true);
    authService.getCurrentUser.mockRejectedValue(new Error("fail"));
    authTokenService.clearSession.mockImplementation(() => {});

    await act(async () => {
      render(
        <AuthProvider>
          <Consumer />
        </AuthProvider>
      );
    });

    await waitFor(() => {
      expect(screen.getByTestId("authenticated").textContent).toBe("false");
    });
  });

  it("login stores user", async () => {
    authTokenService.isAuthenticated.mockReturnValue(false);
    authTokenService.clearSession.mockImplementation(() => {});
    authTokenService.login.mockResolvedValue({ access: "token" });
    authService.getCurrentUser.mockResolvedValue({
      email: "mylena@gmail.com",
    });

    await act(async () => {
      render(
        <AuthProvider>
          <Consumer />
        </AuthProvider>
      );
    });

    await act(async () => {
      screen.getByText("login").click();
    });

    await waitFor(() => {
      expect(localStorage.getItem("user")).toContain("mylena@gmail.com");
    });
  });

  it("logout clears user", async () => {
    authTokenService.isAuthenticated.mockReturnValue(true);
    authService.getCurrentUser.mockResolvedValue({ email: "mylena@gmail.com" });
    authTokenService.logout.mockResolvedValue({});

    await act(async () => {
      render(
        <AuthProvider>
          <Consumer />
        </AuthProvider>
      );
    });
    await waitFor(() =>
      expect(screen.getByTestId("user").textContent).toBe("mylena@gmail.com")
    );
    await act(async () => {
      screen.getByText("logout").click();
    });
    await waitFor(() =>
      expect(screen.getByTestId("user").textContent).toBe("null")
    );
  });

  it("refreshUser updates user", async () => {
    authTokenService.isAuthenticated.mockReturnValue(false);
    authTokenService.clearSession.mockImplementation(() => {});
    authService.getCurrentUser.mockResolvedValue({
      email: "refreshed@gmail.com",
    });
    await act(async () => {
      render(
        <AuthProvider>
          <Consumer />
        </AuthProvider>
      );
    });
    await act(async () => {
      screen.getByText("refresh").click();
    });
    await waitFor(() =>
      expect(screen.getByTestId("user").textContent).toBe("refreshed@gmail.com")
    );
  });

  it("refreshUser clears auth on error", async () => {
    authTokenService.isAuthenticated.mockReturnValue(false);
    authTokenService.clearSession.mockImplementation(() => {});
    authService.getCurrentUser.mockRejectedValue(new Error("fail"));
    await act(async () => {
      render(
        <AuthProvider>
          <Consumer />
        </AuthProvider>
      );
    });
    await act(async () => {
      screen.getByText("refresh").click();
    });
    await waitFor(() =>
      expect(screen.getByTestId("authenticated").textContent).toBe("false")
    );
  });

  it("setAuthenticatedUser stores user in state and localStorage", async () => {
    authTokenService.isAuthenticated.mockReturnValue(false);
    authTokenService.clearSession.mockImplementation(() => {});
    await act(async () => {
      render(
        <AuthProvider>
          <Consumer />
        </AuthProvider>
      );
    });
    await act(async () => {
      screen.getByText("setUser").click();
    });
    await waitFor(() =>
      expect(screen.getByTestId("user").textContent).toBe("set@gmail.com")
    );
    expect(JSON.parse(localStorage.getItem("user")).email).toBe(
      "set@gmail.com"
    );
  });

  it("throws when useAuth is used outside AuthProvider", () => {
    const BareConsumer = () => {
      useAuth();
      return null;
    };
    expect(() => render(<BareConsumer />)).toThrow(
      "useAuth must be used within an AuthProvider"
    );
  });
});
