import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { useAuth } from "../../../contexts/AuthContext";
import satisfactionService from "../../../services/SatisfactionService";
import SatisfactionSection from "../SatisfactionSection";

vi.mock("../../../contexts/AuthContext", () => ({
  useAuth: vi.fn(),
}));

vi.mock("../../../services/SatisfactionService", () => ({
  default: { create: vi.fn() },
}));

vi.mock("../../../languages/LanguageContext", () => ({
  useLanguage: () => ({
    t: (key) => key,
  }),
}));

function renderSection() {
  return render(
    <MemoryRouter>
      <SatisfactionSection />
    </MemoryRouter>
  );
}

describe("SatisfactionSection", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useAuth.mockReturnValue({
      user: {
        first_name: "Mylena",
        last_name: "H",
        email: "mylena@gmail.com",
      },
    });
  });

  it("renders the form", () => {
    renderSection();
    expect(
      screen.getByPlaceholderText("satisfactions.lastNamePlaceholder")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("satisfactions.firstNamePlaceholder")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("satisfactions.emailPlaceholder")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("satisfactions.messagePlaceholder")
    ).toBeInTheDocument();
  });

  it("pre-fills the form with authenticated user data", () => {
    renderSection();
    expect(
      screen.getByPlaceholderText("satisfactions.lastNamePlaceholder")
    ).toHaveValue("H");
    expect(
      screen.getByPlaceholderText("satisfactions.firstNamePlaceholder")
    ).toHaveValue("Mylena");
    expect(
      screen.getByPlaceholderText("satisfactions.emailPlaceholder")
    ).toHaveValue("mylena@gmail.com");
  });

  it("updates form fields when typing", () => {
    renderSection();
    const textarea = screen.getByPlaceholderText(
      "satisfactions.messagePlaceholder"
    );
    fireEvent.change(textarea, {
      target: { value: "Great application!" },
    });
    expect(textarea).toHaveValue("Great application!");
  });

  it("shows success message when polarity is true", async () => {
    satisfactionService.create.mockResolvedValue({ polarity: true });
    renderSection();
    fireEvent.change(
      screen.getByPlaceholderText("satisfactions.messagePlaceholder"),
      {
        target: { value: "Excellent project!" },
      }
    );
    fireEvent.click(
      screen.getByRole("button", { name: "satisfactions.submitButton" })
    );
    expect(
      await screen.findByText("satisfactions.positiveDisplayMessage")
    ).toBeInTheDocument();
    expect(satisfactionService.create).toHaveBeenCalledWith({
      first_name: "Mylena",
      last_name: "H",
      email: "mylena@gmail.com",
      description: "Excellent project!",
    });
  });

  it("shows negative message when polarity is false", async () => {
    satisfactionService.create.mockResolvedValue({ polarity: false });
    renderSection();
    fireEvent.change(
      screen.getByPlaceholderText("satisfactions.messagePlaceholder"),
      {
        target: { value: "Bad experience" },
      }
    );
    fireEvent.click(
      screen.getByRole("button", { name: "satisfactions.submitButton" })
    );
    expect(
      await screen.findByText("satisfactions.negativeDisplayMessage")
    ).toBeInTheDocument();
  });

  it("shows error message when service throws", async () => {
    satisfactionService.create.mockRejectedValue(new Error("Network error"));
    renderSection();
    fireEvent.change(
      screen.getByPlaceholderText("satisfactions.messagePlaceholder"),
      {
        target: { value: "Some feedback" },
      }
    );
    fireEvent.click(
      screen.getByRole("button", { name: "satisfactions.submitButton" })
    );
    expect(await screen.findByText("Network error")).toBeInTheDocument();
  });

  it("clears the form after successful submission", async () => {
    satisfactionService.create.mockResolvedValue({ polarity: true });
    renderSection();
    fireEvent.change(
      screen.getByPlaceholderText("satisfactions.messagePlaceholder"),
      {
        target: { value: "Awesome!" },
      }
    );
    fireEvent.click(
      screen.getByRole("button", { name: "satisfactions.submitButton" })
    );
    await screen.findByText("satisfactions.positiveDisplayMessage");
    expect(
      screen.getByPlaceholderText("satisfactions.lastNamePlaceholder")
    ).toHaveValue("");
    expect(
      screen.getByPlaceholderText("satisfactions.firstNamePlaceholder")
    ).toHaveValue("");
    expect(
      screen.getByPlaceholderText("satisfactions.emailPlaceholder")
    ).toHaveValue("");
    expect(
      screen.getByPlaceholderText("satisfactions.messagePlaceholder")
    ).toHaveValue("");
  });

  it("renders correctly when there is no authenticated user", () => {
    useAuth.mockReturnValue({ user: null });
    renderSection();
    expect(
      screen.getByPlaceholderText("satisfactions.lastNamePlaceholder")
    ).toHaveValue("");
    expect(
      screen.getByPlaceholderText("satisfactions.firstNamePlaceholder")
    ).toHaveValue("");
    expect(
      screen.getByPlaceholderText("satisfactions.emailPlaceholder")
    ).toHaveValue("");
  });
});
