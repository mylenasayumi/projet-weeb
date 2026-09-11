// ProtectedRoute.test.jsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";

import ProtectedRoute from "../ProtectedRoute";

vi.mock("../../contexts/AuthContext", () => ({
  useAuth: vi.fn(),
}));
vi.mock("../../languages/LanguageContext", () => ({
  useLanguage: () => ({ t: (k) => k }),
}));

import { useAuth } from "../../contexts/AuthContext";

function renderRoute(authValue) {
  useAuth.mockReturnValue(authValue);
  return render(
    <MemoryRouter initialEntries={["/protected"]}>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/protected" element={<div>Secret Page</div>} />
        </Route>
        <Route path="/login" element={<div>Login Page</div>} />
      </Routes>
    </MemoryRouter>
  );
}

describe("ProtectedRoute", () => {
  it("shows loading state when loading=true", () => {
    renderRoute({ isAuthenticated: false, loading: true });
    expect(screen.getByText("auth.loading")).toBeInTheDocument();
  });

  it("redirects to /login when not authenticated", () => {
    renderRoute({ isAuthenticated: false, loading: false });
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  it("renders children when authenticated", () => {
    renderRoute({ isAuthenticated: true, loading: false });
    expect(screen.getByText("Secret Page")).toBeInTheDocument();
  });
});
