// LanguageSwitcher.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";

import { useLanguage } from "../LanguageContext";
import LanguageSwitcher from "../LanguageSwitcher";

vi.mock("../LanguageContext", () => ({
  useLanguage: vi.fn(() => ({ lang: "fr", changeLanguage: vi.fn() })),
}));

function renderIt() {
  return render(
    <MemoryRouter>
      <LanguageSwitcher />
    </MemoryRouter>
  );
}

describe("LanguageSwitcher", () => {
  it("renders the toggle button with current language label", () => {
    renderIt();
    expect(screen.getByRole("button", { name: /FR/i })).toBeInTheDocument();
  });

  it("opens dropdown on click", () => {
    renderIt();
    fireEvent.click(screen.getByRole("button", { name: /FR/i }));
    // dropdown should show EN option
    expect(screen.getByText("English")).toBeInTheDocument();
  });

  it("changes language and closes dropdown on option click", () => {
    const changeLanguage = vi.fn();
    useLanguage.mockReturnValue({ lang: "fr", changeLanguage });
    renderIt();
    fireEvent.click(screen.getByRole("button", { name: /FR/i }));
    fireEvent.click(screen.getByText("English"));
    expect(changeLanguage).toHaveBeenCalledWith("en");
  });

  it("closes dropdown on outside click", () => {
    renderIt();
    fireEvent.click(screen.getByRole("button", { name: /FR/i }));
    expect(screen.getByText("English")).toBeInTheDocument();
    fireEvent.mouseDown(document.body);
    expect(screen.queryByText("English")).not.toBeInTheDocument();
  });

  it("shows EN label when lang is en", () => {
    useLanguage.mockReturnValue({ lang: "en", changeLanguage: vi.fn() });
    renderIt();
    expect(screen.getByRole("button", { name: /EN/i })).toBeInTheDocument();
  });
});
