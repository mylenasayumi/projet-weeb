// PasswordResetService.test.jsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import apiService from "../ApiService";
import passwordResetService from "../PasswordResetService";

vi.mock("../ApiService", () => ({
    default: {
        post: vi.fn(),
    },
}));

describe("PasswordResetService", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("requestResetPassword sends e-mail and frontend_url", async () => {
        apiService.post.mockResolvedValue({
            message: "If an account is associated with this email, you will receive instructions to reset your password.",

        });

        const result = await passwordResetService.requestResetPassword("mylena@gmail.com");

        expect(apiService.post).toHaveBeenCalledWith(
            "/api/users/password-reset/request/",
            {
                email: "mylena@gmail.com",
                frontend_url: window.location.origin,
            }
        );
        expect(result.message).toContain("If an account is associated");
    });

    it("confirmResetPassword sends uidb64 in the query param", async () => {
        apiService.post.mockResolvedValue({
            message: "Password reset successfully",
        });

        const result = await passwordResetService.confirmResetPassword(
            "Ng",
            "token-123",
            "newpassword123"
        );

        expect(apiService.post).toHaveBeenCalledWith(
            "/api/users/password-reset/confirm/?uidb64=Ng",
            {
                token: "token-123",
                password: "newpassword123",
            }
        );
        expect(result.message).toBe("Password reset successfully");
    });

    it("throws an error when requestResetPassword fails", async () => {
        apiService.post.mockRejectedValue({
            response: {
                data: { error: "Reset request failed" },
            },
        });

        await expect(passwordResetService.requestResetPassword("mylena@gmail.com")).rejects.toThrow();
    });

    it("throws an error when confirmResetPassword fails", async () => {
        apiService.post.mockRejectedValue({
            response: {
                data: { error: "Invalid reset link." },
            },
        });

        await expect(passwordResetService.confirmResetPassword("Ng", "token", "newpassword123")).rejects.toThrow();
    });
});