// Articles.test.jsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";

import Articles from "../Articles";

vi.mock("../../components/ui/ScrollToTop", () => ({ default: () => null }));

vi.mock("../../components/articles/ArticlesSection", () => ({
  default: () => <div>ArticlesSection</div>,
}));

describe("Articles page", () => {
  it("renders ArticlesSection", () => {
    render(
      <MemoryRouter>
        <Articles />
      </MemoryRouter>
    );
    expect(screen.getByText("ArticlesSection")).toBeInTheDocument();
  });
});
