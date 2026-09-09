// ErrorLayout.test.jsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";

import { LanguageProvider } from "../../languages/LanguageContext";
import ErrorLayout from "../ErrorLayout";

vi.mock("../../components/ui/ScrollToTop", () => ({ default: () => null }));

vi.mock("../../components/layout/ErrorPage", () => ({
  default: () => <div>ErrorPage</div>,
}));

describe("ErrorLayout page", () => {
  it("renders ErrorPage component", () => {
    render(
      <MemoryRouter>
        <LanguageProvider>
          <ErrorLayout />
        </LanguageProvider>
      </MemoryRouter>
    );
    expect(screen.getByText("ErrorPage")).toBeInTheDocument();
  });
});
