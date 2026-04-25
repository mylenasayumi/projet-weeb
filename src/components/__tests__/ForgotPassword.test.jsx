// ForgotPassword.test.jsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
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

describe("ForgotPassword", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("sends reset e-mail", async () => {
        passwordResetService.requestResetPassword.mockResolvedValue({
            message: "If an account is associated with this email, you will receive instructions to reset your password.",
        });

        render(<ForgotPassword />);

        fireEvent.change(screen.getByPlaceholderText("password.email"), {
            target: { value: "mylena@gmail.com" },
        });

        fireEvent.click(screen.getByRole("button", { name: "password.sendButton" }));

        await waitFor(() => {
            expect(passwordResetService.requestResetPassword).toHaveBeenCalledWith("mylena@gmail.com");
        });

        expect(await screen.findByText("password.forgotPasswordMessage")).toBeInTheDocument();    
    });

    it("shows error when request reset passaword fails", async () => {
        passwordResetService.requestResetPassword.mockRejectedValue(
            new Error("Reset failed")
        );

        render(<ForgotPassword />);

        fireEvent.change(screen.getByPlaceholderText("password.email"), {
            target: { value: "mylena@gmail.com" },
        });

        fireEvent.click(screen.getByRole("button", { name: "password.sendButton" }));

        expect(await screen.findByText("password.errorMessage")).toBeInTheDocument();
    });
});