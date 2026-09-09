// NewsletterSubscription.test.jsx
import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import NewsletterSubscription from "../NewsletterSubscription";

vi.mock("../../languages/LanguageContext", () => ({
  useLanguage: () => ({ t: (k) => k }),
}));

describe("NewsletterSubscription", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("renders email input and subscribe button", () => {
    render(<NewsletterSubscription />);
    expect(screen.getByPlaceholderText("newsletter.email")).toBeInTheDocument();
    expect(screen.getByText("newsletter.subscribeButton")).toBeInTheDocument();
  });

  it("shows sending state while loading", async () => {
    render(<NewsletterSubscription />);
    fireEvent.change(screen.getByPlaceholderText("newsletter.email"), {
      target: { value: "a@b.com" },
    });
    fireEvent.click(screen.getByText("newsletter.subscribeButton"));
    expect(screen.getByText("newsletter.sending")).toBeInTheDocument();
    await act(async () => {
      vi.advanceTimersByTime(2000);
    });
    expect(
      screen.getByText("newsletter.subscriptionSuccess")
    ).toBeInTheDocument();
  });

  it("clears email after successful subscription", async () => {
    render(<NewsletterSubscription />);
    const input = screen.getByPlaceholderText("newsletter.email");
    fireEvent.change(input, { target: { value: "a@b.com" } });
    fireEvent.click(screen.getByText("newsletter.subscribeButton"));
    await act(async () => {
      vi.advanceTimersByTime(2000);
    });
    expect(input).toHaveValue("");
  });
});
