// ResetPassword.test.jsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import passwordResetService from "../../services/PasswordResetService";
import ResetPassword from "../../pages/ResetPassword";

const mockNavigate = vi.fn();
let mockSearch = "?uidb64=Ng&token=abc123";

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
        useLocation: () => ({
            search: mockSearch,
        }),
    };
});

vi.mock("../../services/PasswordResetService", () => ({
    default: {
        confirmResetPassword: vi.fn(),
    },
}));

vi.mock("../../languages/LanguageContext", () => ({
    useLanguage: () => ({
        t: (key) => key,
        lang: "en",
        changeLanguage: vi.fn(),
    }),
}));

describe("ResetPassword", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("resets password", async () => {
        passwordResetService.confirmResetPassword.mockResolvedValue({
            message: "Password reset successfully.",
        });

        render(<ResetPassword />);

        fireEvent.change(screen.getByPlaceholderText("password.newPasswordPlaceholder"), {
            target: { value: "newpassword123" },
        });

        fireEvent.change(screen.getByPlaceholderText("password.confirmPasswordPlaceholder"), {
            target: { value: "newpassword123" },
        });

        fireEvent.click(screen.getByRole("button", { name: "password.resetButton" }));

        await waitFor(() => {
            expect(passwordResetService.confirmResetPassword).toHaveBeenCalledWith(
                "Ng",
                "abc123",
                "newpassword123"
            );
        });
    });

    it("shows an error if the passwords don't match.", async () => {
        render(<ResetPassword />);

        fireEvent.change(screen.getByPlaceholderText("password.newPasswordPlaceholder"), {
            target: { value: "newpassword123" },
        });

        fireEvent.change(screen.getByPlaceholderText("password.confirmPasswordPlaceholder"), {
            target: { value: "different123" },
        });

        fireEvent.click(screen.getByRole("button", { name: "password.resetButton" }));

        expect(await screen.findByText("password.passwordsDoNotMatchMessage")).toBeInTheDocument();
    });

    it("shows error when confirm reset password fails", async () => {
        passwordResetService.confirmResetPassword.mockRejectedValue(
            new Error("Invalid reset link.")
        );

        render(<ResetPassword />);

        fireEvent.change(
            screen.getByPlaceholderText("password.newPasswordPlaceholder"),
            {
                target: { value: "newpassword123" },
            }
        );

        fireEvent.change(screen.getByPlaceholderText("password.confirmPasswordPlaceholder"),
            { 
                target: { value: "newpassword123" },
            }
        );

        fireEvent.click(screen.getByRole("button", { name: "password.resetButton" }));

        expect(await screen.findByText("password.resetErrorMessage")).toBeInTheDocument();
    });

    it("shows error when reset link is invalid", async () => {
        mockSearch = "?uidb64=Ng";

        render(<ResetPassword />);

        fireEvent.change(screen.getByPlaceholderText("password.newPasswordPlaceholder"), {
            target: { value: "newpassword123" },
        });

        fireEvent.change(screen.getByPlaceholderText("password.confirmPasswordPlaceholder"), {
            target: { value: "newpassword123" },
        });

        fireEvent.click(screen.getByRole("button", { name: "password.resetButton" }));

        expect(await screen.findByText("password.invalidLinkMessage")).toBeInTheDocument();
    });

    it("shows error when password is too short", async () => {
        mockSearch = "?uidb64=Ng&token=abc123";

        render(<ResetPassword />);

        fireEvent.change(screen.getByPlaceholderText("password.newPasswordPlaceholder"), {
            target: { value: "123" },
        });

        fireEvent.change(screen.getByPlaceholderText("password.confirmPasswordPlaceholder"), {
            target: { value: "123" },
        });

        fireEvent.click(screen.getByRole("button", { name: "password.resetButton" }));

        expect(await screen.findByText("password.passwordTooShortMessage")).toBeInTheDocument();
    });
});