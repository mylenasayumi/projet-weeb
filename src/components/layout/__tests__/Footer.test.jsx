// Footer.test.jsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";

import Footer from "../Footer";

vi.mock("../../../languages/LanguageContext", () => ({
  useLanguage: () => ({ t: (k) => k }),
}));

describe("Footer (layout)", () => {
  it("renders weeb brand name", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText("weeb")).toBeInTheDocument();
  });

  it("renders product section link", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText("footer.product")).toBeInTheDocument();
  });

  it("renders social media images", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByAltText("Youtube Icon")).toBeInTheDocument();
  });
});
