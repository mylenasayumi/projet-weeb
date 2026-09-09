// Login.test.jsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";

import Login from "../Login";

vi.mock("../../components/ui/ScrollToTop", () => ({ default: () => null }));

vi.mock("../../components/users/login/LoginSection", () => ({
  default: () => <div>LoginSection</div>,
}));

describe("Login page", () => {
  it("renders LoginSection", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(screen.getByText("LoginSection")).toBeInTheDocument();
  });
});
