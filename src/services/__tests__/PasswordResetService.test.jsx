// PasswordResetService.test.jsx
import axios from "axios";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { API_BASE_URL } from "../../constants/api";
import passwordResetService from "../PasswordResetService";

vi.mock("axios", () => ({
  default: {
    post: vi.fn(),
  },
}));

describe("PasswordResetService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("requestResetPassword sends e-mail", async () => {
    axios.post.mockResolvedValue({
      data: {
        message:
          "If an account is associated with this email, you will receive instructions to reset your password.",
      },
    });

    const result =
      await passwordResetService.requestResetPassword("mylena@gmail.com");

    expect(axios.post).toHaveBeenCalledWith(
      `${API_BASE_URL}/api/users/password-reset/request/`,
      { email: "mylena@gmail.com" },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: false,
      }
    );
    expect(result.message).toContain("If an account is associated");
  });

  it("confirmResetPassword sends uidb64 in the query param", async () => {
    axios.post.mockResolvedValue({
      data: {
        message: "Password reset successfully",
      },
    });

    const result = await passwordResetService.confirmResetPassword(
      "Ng",
      "token-123",
      "newpassword123"
    );

    expect(axios.post).toHaveBeenCalledWith(
      `${API_BASE_URL}/api/users/password-reset/confirm/?uidb64=Ng`,
      {
        token: "token-123",
        password: "newpassword123",
      },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: false,
      }
    );
    expect(result.message).toBe("Password reset successfully");
  });

  it("throws an error when requestResetPassword fails", async () => {
    axios.post.mockRejectedValue({
      response: {
        data: { error: "Reset request failed" },
      },
    });

    await expect(
      passwordResetService.requestResetPassword("mylena@gmail.com")
    ).rejects.toThrow("Reset request failed");
  });

  it("throws an error when confirmResetPassword fails", async () => {
    axios.post.mockRejectedValue({
      response: {
        data: { error: "Invalid reset link." },
      },
    });

    await expect(
      passwordResetService.confirmResetPassword("Ng", "token", "newpassword123")
    ).rejects.toThrow("Invalid reset link.");
  });
});
