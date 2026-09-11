// ErrorPage.test.jsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import ErrorPage from "../ErrorPage";

vi.mock("../../../languages/LanguageContext", () => ({
  useLanguage: () => ({ t: (k) => k }),
}));

describe("ErrorPage (layout)", () => {
  it("renders the error translation key", () => {
    render(<ErrorPage />);
    expect(screen.getByText("errorPage.error")).toBeInTheDocument();
  });
});
