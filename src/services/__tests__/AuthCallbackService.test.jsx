// AuthCallbackService.test.jsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import authService from "../AuthService";
import authTokenService from "../AuthTokenService";
import authCallbackService from "../AuthCallbackService";

vi.mock("../AuthService", () => ({
    default: {
        getCurrentUser: vi.fn(),
    },
}));

vi.mock("../AuthTokenService", () => ({
    default: {
        logout: vi.fn(),
    },
}));

describe("AuthCallbackService", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();

        Object.defineProperty(document, "cookie", {
            writable: true,
            value: "access_token=test-cookie-token",
        });
    });

    it("saves access_token and user in Github callback", async () => {
        authService.getCurrentUser.mockResolvedValue({
            id: 1,
            email: "mylena@gmail.com",
            first_name: "Mylena",
            last_name: "Hamasaki",
            is_active: true,
        });

        const result = await authCallbackService.handleAuthCallback();

        expect(localStorage.getItem("access_token")).toBe("test-cookie-token");
        expect(JSON.parse(localStorage.getItem("user"))).toEqual(result);
    });

    it("logs out if user retrieval fails", async () => {
        authService.getCurrentUser.mockRejectedValue(new Error("boom"));

        await expect(authCallbackService.handleAuthCallback()).rejects.toThrow("user_fetch_failed");

        expect(authTokenService.logout).toHaveBeenCalled();
    });

    it("throws github_access_denied when error=access_denied", async () => {
        delete window.location;
        window.location = {
            search: "?error=access_denied",
        };

        await expect(authCallbackService.handleAuthCallback()).rejects.toThrow("github_access_denied");
    });

    it("throws github_auth_failed when access token cookie is missing", async () => {
        Object.defineProperty(document, "cookie", {
            writable: true,
            value: "",
        });

        delete window.location;
        window.location = {
            search: "",
        };

        await expect(authCallbackService.handleAuthCallback()).rejects.toThrow("github_auth_failed");
    });

    it("throws github_auth_error for unknown github error", async () => {
        delete window.location;
        window.location = {
            search: "?error=github_token_failed",
        };

        await expect(authCallbackService.handleAuthCallback()).rejects.toThrow("github_auth_error: github_token_failed");
    });
});