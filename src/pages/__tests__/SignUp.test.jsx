// SignUp.test.jsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";

import SignUp from "../SignUp";

vi.mock("../../components/ui/ScrollToTop", () => ({ default: () => null }));

vi.mock("../../components/users/sign-up/SignUpForm", () => ({
  default: () => <div>SignUpForm</div>,
}));

describe("SignUp page", () => {
  it("renders SignUpForm", () => {
    render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );
    expect(screen.getByText("SignUpForm")).toBeInTheDocument();
  });
});
