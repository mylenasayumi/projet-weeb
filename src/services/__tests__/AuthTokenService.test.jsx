// AuthTokenService.test.jsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import api from "../ApiClient";
import authTokenService from "../AuthTokenService";

vi.mock("../ApiClient", () => ({
    default: {
        post: vi.fn(),
    },
}));

describe("AuthTokenService", () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
    });

    it("logs in and save the access token.", async () => {
        api.post.mockResolvedValue({
            data: { access: "access-token-value" },
        });

        const result = await authTokenService.login("mylena@gmail.com", "mylena1234");

        expect(api.post).toHaveBeenCalledWith("/api/auth/token/", {
            email: "mylena@gmail.com",
            password: "mylena1234",
        });
        expect(localStorage.getItem("access_token")).toBe("access-token-value");
        expect(result).toEqual({ access: "access-token-value" });
    });

    it("throws an error message on failed login.", async () => {
        api.post.mockRejectedValue({
            response: {
                data: { detail: "An error occurred during the connection." },
            },
        });

        await expect(
            authTokenService.login("mylena@gmail.com", "wrong")
        ).rejects.toThrow("An error occurred during the connection.");
    });

    it("logs out calls endpoint and clears storage.", async () => {
        api.post.mockResolvedValue({ data: { detail: "Logout" } });
        localStorage.setItem("access_token", "abc");
        localStorage.setItem("user", JSON.stringify({ id: 1 }));

        await authTokenService.logout();

        expect(api.post).toHaveBeenCalledWith("/api/auth/logout/");
        expect(localStorage.getItem("access_token")).toBeNull();
        expect(localStorage.getItem("user")).toBeNull();
    });

    it("isAuthenticated returns true when an access_token exists", () => {
        localStorage.setItem("access_token", "abc");
        expect(authTokenService.isAuthenticated()).toBe(true);
    });

    it("isAuthenticated returns false when there is no access_token", () => {
        expect(authTokenService.isAuthenticated()).toBe(false);
    });

    it("throws default invalid credentials message", async () => {
        api.post.mockRejectedValue({ response: { data: {} } });

        await expect(
            authTokenService.login("test@test.com", "wrong")
        ).rejects.toThrow("Invalid credentials");
    });
});