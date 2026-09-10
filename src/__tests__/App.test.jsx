// App.test.jsx
import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";

import App from "../App";

vi.mock("../components/layout/Navbar", () => ({
  default: () => <nav>Navbar</nav>,
}));
vi.mock("../components/layout/Footer", () => ({
  default: () => <footer>Footer</footer>,
}));
vi.mock("../components/ui/ScrollToTop", () => ({ default: () => null }));
vi.mock("../components/ui/ScrollToTopButton", () => ({ default: () => null }));

describe("App", () => {
  beforeEach(() => {
    localStorage.clear();
    cleanup();
  });

  it("renders Navbar, Outlet and Footer", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Navbar")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });
});
