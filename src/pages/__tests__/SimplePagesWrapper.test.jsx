// SimplePagesWrapper.test.jsx - covers page wrapper components
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";

// mocks shared
vi.mock("../../components/ui/ScrollToTop", () => ({ default: () => null }));
vi.mock("../../languages/LanguageContext", () => ({
  useLanguage: () => ({ t: (k) => k }),
}));

// About Us
vi.mock("../../components/about-us/ExploreTheWebSection", () => ({
  default: () => <div>ExploreSection</div>,
}));
vi.mock("../../components/about-us/TrustCompaniesSection", () => ({
  default: () => <div>TrustSection</div>,
}));
vi.mock("../../components/about-us/LearnAndProgressSection", () => ({
  default: () => <div>LearnSection</div>,
}));
vi.mock("../../components/about-us/StayInformedSection", () => ({
  default: () => <div>StaySection</div>,
}));

import AboutUs from "../AboutUs";

describe("AboutUs page", () => {
  it("renders all four about-us sections", () => {
    render(
      <MemoryRouter>
        <AboutUs />
      </MemoryRouter>
    );
    expect(screen.getByText("ExploreSection")).toBeInTheDocument();
    expect(screen.getByText("TrustSection")).toBeInTheDocument();
    expect(screen.getByText("LearnSection")).toBeInTheDocument();
    expect(screen.getByText("StaySection")).toBeInTheDocument();
  });
});
