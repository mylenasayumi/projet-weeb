// ForgotPassword.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";

import ForgotPassword from "../../pages/ForgotPassword";
import passwordResetService from "../../services/PasswordResetService";

vi.mock("../../services/PasswordResetService", () => ({
  default: {
    requestResetPassword: vi.fn(),
  },
}));

vi.mock("../../languages/LanguageContext", () => ({
  useLanguage: () => ({
    t: (key) => key,
    lang: "en",
    changeLanguage: vi.fn(),
  }),
}));

vi.mock("../../contexts/AuthContext", () => ({
  useAuth: () => ({
    isAuthenticated: false,
  }),
}));

const renderComponent = () => {
  render(
    <MemoryRouter>
      <ForgotPassword />
    </MemoryRouter>
  );
};

describe("ForgotPassword", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("sends reset e-mail", async () => {
    passwordResetService.requestResetPassword.mockResolvedValue({
      message:
        "If an account is associated with this email, you will receive instructions to reset your password.",
    });

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText("password.email"), {
      target: { value: "mylena@gmail.com" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: "password.sendButton" })
    );

    expect(passwordResetService.requestResetPassword).toHaveBeenCalledWith(
      "mylena@gmail.com"
    );

    expect(
      await screen.findByText("password.forgotPasswordMessage")
    ).toBeInTheDocument();
  });

  it("shows error when request reset password fails", async () => {
    passwordResetService.requestResetPassword.mockRejectedValue(
      new Error("Reset failed")
    );

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText("password.email"), {
      target: { value: "mylena@gmail.com" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: "password.sendButton" })
    );

    expect(
      await screen.findByText("password.errorMessage")
    ).toBeInTheDocument();
  });
});
