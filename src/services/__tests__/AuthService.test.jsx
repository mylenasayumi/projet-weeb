// AuthService.test.jsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import apiService from "../ApiService";
import authService from "../AuthService";

vi.mock("../ApiService", () => ({
    default: {
        post: vi.fn(),
        get: vi.fn(),
        put: vi.fn(),
        patch: vi.fn(),
        delete: vi.fn(),
    },
}));

describe("AuthService", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("register calls /api/users/", async () => {
        const payload = {
            email: "mylena@gmail.com",
            first_name: "Mylena",
            last_name: "Hamasaki",
            password: "mylena1234",
        };

        apiService.post.mockResolvedValue({ id: 6, ...payload });

        const result = await authService.register(payload);

        expect(apiService.post).toHaveBeenCalledWith("/api/users/", payload);
        expect(result.id).toBe(6);
    });

    it("register normalizes backend error.", async () => {
        apiService.post.mockRejectedValue({
            response: {
                data: {
                    email: ["user with this email already exists."],
                },
            },
        });

        await expect(
            authService.register({
                email: "mylena@gmail.com",
                first_name: "Mylena",
                last_name: "Hamasaki",
                password: "mylena1234",
            })
        ).rejects.toThrow("user with this email already exists.");
    });

    it("getCurrentUser calls /api/users/me/", async () => {
        apiService.get.mockResolvedValue({ id: 1, email: "mylena@gmail.com" });

        const result = await authService.getCurrentUser();

        expect(apiService.get).toHaveBeenCalledWith("/api/users/me/");
        expect(result.email).toBe("mylena@gmail.com");
    });

    it("getById calls /api/users/:id/", async () => {
        apiService.get.mockResolvedValue({ id: 1 });

        const result = await authService.getById(1);

        expect(apiService.get).toHaveBeenCalledWith("/api/users/1/");
        expect(result.id).toBe(1);
    });

    it("update calls PUT /api/users/:id/", async () => {
        apiService.put.mockResolvedValue({ id: 1, first_name: "Mylena" });

        const result = await authService.update(1, { first_name: "Mylena" });

        expect(apiService.put).toHaveBeenCalledWith("/api/users/1/", {
            first_name: "Mylena",
        });
        expect(result.first_name).toBe("Mylena");
    });

    it("partialUpdate calls PATCH /api/users/:id/", async () => {
        apiService.patch.mockResolvedValue({ id: 1, last_name: "Hamasaki" });

        const result = await authService.partialUpdate(1, { last_name: "Hamasaki" });

        expect(apiService.patch).toHaveBeenCalledWith("/api/users/1/", {
            last_name: "Hamasaki",
        });
        expect(result.last_name).toBe("Hamasaki");
    });

    it("delete calls DELETE /api/users/:id/", async () => {
        apiService.delete.mockResolvedValue({});

        await authService.delete(1);

        expect(apiService.delete).toHaveBeenCalledWith("/api/users/1/");
    });

    it("register uses fallback error message", async () => {
        apiService.post.mockRejectedValue({
            response: {
                data: {},
            },
        });

        await expect(
            authService.register({
                email: "test@test.com",
                first_name: "Test",
                last_name: "User",
                password: "password123",
            })
        ).rejects.toThrow("Error while registering.");
    });
});