// ErrorLayout.test.jsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";

import ErrorLayout from "../ErrorLayout";

vi.mock("../../components/ui/ScrollToTop", () => ({ default: () => null }));

vi.mock("../../components/ErrorPage", () => ({
  default: () => <div>ErrorPage</div>,
}));

describe("ErrorLayout page", () => {
  it("renders ErrorPage component", () => {
    render(
      <MemoryRouter>
        <ErrorLayout />
      </MemoryRouter>
    );
    expect(screen.getByText("ErrorPage")).toBeInTheDocument();
  });
});
