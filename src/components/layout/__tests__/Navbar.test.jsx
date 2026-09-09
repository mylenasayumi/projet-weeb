// Navbar.test.jsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { useAuth } from "../../../contexts/AuthContext";
import Navbar from "../Navbar";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => mockNavigate };
});

vi.mock("../../../languages/LanguageContext", () => ({
  useLanguage: () => ({ t: (k) => k }),
}));

vi.mock("../../../languages/LanguageSwitcher", () => ({
  default: () => <div data-testid="lang-sw">LS</div>,
}));

vi.mock("../../ui/UserDropdown", () => ({
  default: ({ onLogout }) => (
    <button data-testid="ud-logout" onClick={onLogout}>
      Logout
    </button>
  ),
}));

vi.mock("../../../contexts/AuthContext", () => ({
  useAuth: vi.fn(() => ({ user: null, logout: vi.fn() })),
}));

function renderNavbar() {
  return render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );
}

describe("Navbar (layout)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockNavigate.mockClear();
    useAuth.mockReturnValue({ user: null, logout: vi.fn() });
  });

  it("renders weeb logo", () => {
    renderNavbar();
    expect(screen.getByText("weeb")).toBeInTheDocument();
  });

  it("shows login/signup when no user", () => {
    renderNavbar();
    expect(screen.getByText("navbar.login")).toBeInTheDocument();
    expect(screen.getByText("navbar.signUp")).toBeInTheDocument();
  });

  it("shows UserDropdown when user is logged in", () => {
    useAuth.mockReturnValue({ user: { first_name: "M" }, logout: vi.fn() });
    renderNavbar();
    expect(screen.getAllByTestId("ud-logout").length).toBeGreaterThan(0);
  });

  it("toggles theme on button click (light to dark)", () => {
    renderNavbar();
    const themeButtons = screen
      .getAllByRole("button")
      .filter((b) => b.getAttribute("aria-label"));
    fireEvent.click(themeButtons[0]);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("opens mobile menu on hamburger click", () => {
    renderNavbar();
    const menuBtn = screen
      .getByAltText("Hamburger Menu Button")
      .closest("button");
    fireEvent.click(menuBtn);
    expect(screen.getAllByText("navbar.aboutUs").length).toBeGreaterThan(1);
  });

  it("closes mobile menu on outside click", async () => {
    renderNavbar();
    const menuBtn = screen
      .getByAltText("Hamburger Menu Button")
      .closest("button");
    fireEvent.click(menuBtn);
    expect(screen.getAllByText("navbar.aboutUs")).toHaveLength(2);
    fireEvent.mouseDown(document.body);
    await waitFor(() =>
      expect(screen.getAllByText("navbar.aboutUs")).toHaveLength(1)
    );
  });

  it("calls logout and navigates to /login", async () => {
    const logout = vi.fn().mockResolvedValue(undefined);
    useAuth.mockReturnValue({ user: { first_name: "M" }, logout });
    renderNavbar();
    fireEvent.click(screen.getAllByTestId("ud-logout")[0]);
    await waitFor(() =>
      expect(mockNavigate).toHaveBeenCalledWith("/login", { replace: true })
    );
    expect(logout).toHaveBeenCalled();
  });

  it("mobile menu shows login/signup when unauthenticated", () => {
    renderNavbar();
    const menuBtn = screen
      .getByAltText("Hamburger Menu Button")
      .closest("button");
    fireEvent.click(menuBtn);
    expect(screen.getAllByText("navbar.login").length).toBeGreaterThan(0);
  });

  it("mobile menu hides login/signup when authenticated", () => {
    useAuth.mockReturnValue({ user: { first_name: "M" }, logout: vi.fn() });
    renderNavbar();
    const menuBtn = screen
      .getByAltText("Hamburger Menu Button")
      .closest("button");
    fireEvent.click(menuBtn);
    // login link should not appear in mobile menu
    const loginLinks = screen.queryAllByRole("link", { name: "navbar.login" });
    expect(loginLinks.length).toBe(0);
  });
});
