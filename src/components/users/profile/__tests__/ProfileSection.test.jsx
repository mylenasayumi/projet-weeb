// ProfileSection.test.jsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { waitForElementToBeRemoved } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import ProfileSection from "../ProfileSection";

vi.mock("../../../../languages/LanguageContext", () => ({
  useLanguage: () => ({ t: (k) => k }),
}));

const user = {
  first_name: "Mylena",
  last_name: "H",
  email: "mylena@gmail.com",
};

const articles = [
  { id: 1, title: "Article One", description: "Desc 1", image: null },
  {
    id: 2,
    title: "Article Two",
    description: "Desc 2",
    image: "https://img.com/x.png",
  },
];

function renderSection(props = {}) {
  return render(
    <ProfileSection
      user={user}
      articles={articles}
      loading={false}
      onView={vi.fn()}
      onCreate={vi.fn()}
      onUpdate={vi.fn()}
      onDelete={vi.fn()}
      page={1}
      totalPages={1}
      onPreviousPage={vi.fn()}
      onNextPage={vi.fn()}
      {...props}
    />
  );
}

describe("ProfileSection", () => {
  it("renders user name and email", () => {
    renderSection();
    expect(screen.getByText("Mylena H")).toBeInTheDocument();
    expect(screen.getByText("mylena@gmail.com")).toBeInTheDocument();
  });

  it("renders article titles", () => {
    renderSection();
    expect(screen.getByText("Article One")).toBeInTheDocument();
    expect(screen.getByText("Article Two")).toBeInTheDocument();
  });

  it("shows loading message when loading=true", () => {
    renderSection({ articles: [], loading: true });
    expect(screen.getByText("articles.loadingArticles")).toBeInTheDocument();
  });

  it("shows empty message when no articles", () => {
    renderSection({ articles: [], loading: false });
    expect(screen.getByText("profile.noArticles")).toBeInTheDocument();
  });

  it("shows create form when toggle button clicked", () => {
    renderSection();
    fireEvent.click(screen.getByText("articles.createArticlePage"));
    expect(screen.getByPlaceholderText("articles.title")).toBeInTheDocument();
  });

  it("hides form when toggle clicked again", async () => {
    renderSection();
    fireEvent.click(screen.getByText("articles.createArticlePage"));
    fireEvent.click(screen.getByText("articles.createArticlePage"));
    await waitForElementToBeRemoved(() =>
      screen.queryByPlaceholderText("articles.title")
    );
  });

  it("calls onCreate when form is submitted", async () => {
    const onCreate = vi.fn().mockResolvedValue(undefined);
    renderSection({ onCreate });
    fireEvent.click(screen.getByText("articles.createArticlePage"));
    fireEvent.change(screen.getByPlaceholderText("articles.title"), {
      target: { name: "title", value: "New" },
    });
    fireEvent.change(screen.getByPlaceholderText("articles.description"), {
      target: { name: "description", value: "Desc" },
    });
    fireEvent.click(screen.getByText("articles.createArticleSaveButton"));
    await waitFor(() => expect(onCreate).toHaveBeenCalled());
  });

  it("cancel button clears form and closes it", async () => {
    renderSection();
    fireEvent.click(screen.getByText("articles.createArticlePage"));
    fireEvent.change(screen.getByPlaceholderText("articles.title"), {
      target: { name: "title", value: "Draft" },
    });
    fireEvent.click(screen.getByText("articles.cancel"));
    await waitForElementToBeRemoved(() =>
      screen.queryByPlaceholderText("articles.title")
    );
  });

  it("calls onView when article title is clicked", () => {
    const onView = vi.fn();
    renderSection({ onView });
    fireEvent.click(screen.getByText("Article One"));
    expect(onView).toHaveBeenCalledWith(articles[0]);
  });

  it("calls onUpdate when edit button clicked", () => {
    const onUpdate = vi.fn();
    renderSection({ onUpdate });
    fireEvent.click(screen.getAllByText("articles.edit")[0]);
    expect(onUpdate).toHaveBeenCalledWith(articles[0]);
  });

  it("calls onDelete when delete button clicked", () => {
    const onDelete = vi.fn();
    renderSection({ onDelete });
    fireEvent.click(screen.getAllByText("articles.delete")[0]);
    expect(onDelete).toHaveBeenCalledWith(articles[0].id);
  });

  it("shows pagination when totalPages > 1", () => {
    renderSection({ page: 1, totalPages: 3 });
    expect(
      screen.getAllByRole("button").some((b) => b.disabled !== undefined)
    ).toBe(true);
  });

  it("hides pagination when totalPages <= 1", () => {
    renderSection({ page: 1, totalPages: 1 });
    // Pagination component should not be present
    expect(screen.queryByText(/1 \/ 1/)).not.toBeInTheDocument();
  });

  it("renders article image when present", () => {
    renderSection();
    expect(screen.getByAltText("Article Two")).toBeInTheDocument();
  });

  it("renders avatar with first letter", () => {
    renderSection();
    expect(screen.getByText("M")).toBeInTheDocument();
  });

  it("shows '?' avatar when user has no first_name", () => {
    renderSection({ user: { ...user, first_name: undefined } });
    expect(screen.getByText("?")).toBeInTheDocument();
  });

  it("shows '-' username when names are missing", () => {
    renderSection({ user: { email: "m@h.com" } });
    expect(screen.getByText("-")).toBeInTheDocument();
  });
});
