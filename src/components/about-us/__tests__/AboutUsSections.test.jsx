// AboutUsSections.test.jsx - covers about-us/* (the 4 sections imported by pages/AboutUs.jsx)
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";

import ExploreTheWebSection from "../ExploreTheWebSection";
import LearnAndProgressSection from "../LearnAndProgressSection";
import StayInformedSection from "../StayInformedSection";
import TrustCompaniesSection from "../TrustCompaniesSection";

vi.mock("../../../languages/LanguageContext", () => ({
  useLanguage: () => ({
    t: (key) => key,
    lang: "en",
    changeLanguage: vi.fn(),
  }),
}));

describe("ExploreTheWebSection", () => {
  it("renders discover articles link", () => {
    render(
      <MemoryRouter>
        <ExploreTheWebSection />
      </MemoryRouter>
    );
    expect(screen.getByText("aboutUs.discoverArticles")).toBeInTheDocument();
  });
  it("renders subscribe newsletter link", () => {
    render(
      <MemoryRouter>
        <ExploreTheWebSection />
      </MemoryRouter>
    );
    expect(screen.getByText("aboutUs.subscribeNewsletter")).toBeInTheDocument();
  });
});

describe("TrustCompaniesSection", () => {
  it("renders trust companies heading", () => {
    render(
      <MemoryRouter>
        <TrustCompaniesSection />
      </MemoryRouter>
    );
    expect(screen.getByText("aboutUs.trustCompanies")).toBeInTheDocument();
  });
});

describe("LearnAndProgressSection", () => {
  it("renders resources label", () => {
    render(
      <MemoryRouter>
        <LearnAndProgressSection />
      </MemoryRouter>
    );
    expect(screen.getByText("aboutUs.resources")).toBeInTheDocument();
  });
  it("renders explore resources button", () => {
    render(
      <MemoryRouter>
        <LearnAndProgressSection />
      </MemoryRouter>
    );
    expect(
      screen.getByText("aboutUs.exploreResourcesButton")
    ).toBeInTheDocument();
  });
});

describe("StayInformedSection", () => {
  it("renders stay informed content", () => {
    render(
      <MemoryRouter>
        <StayInformedSection />
      </MemoryRouter>
    );
    expect(screen.getByText("aboutUs.stayInformed")).toBeInTheDocument();
  });
  it("renders articles button", () => {
    render(
      <MemoryRouter>
        <StayInformedSection />
      </MemoryRouter>
    );
    expect(screen.getByText("aboutUs.articlesButton")).toBeInTheDocument();
  });
});
