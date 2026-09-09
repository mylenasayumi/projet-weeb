// Contact.test.jsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";

import Contact from "../Contact";

vi.mock("../../components/ui/ScrollToTop", () => ({ default: () => null }));

vi.mock("../../components/contact/SatisfactionSection", () => ({
  default: () => <div>SatisfactionSection</div>,
}));

describe("Contact page", () => {
  it("renders SatisfactionSection", () => {
    render(
      <MemoryRouter>
        <Contact />
      </MemoryRouter>
    );
    expect(screen.getByText("SatisfactionSection")).toBeInTheDocument();
  });
});
