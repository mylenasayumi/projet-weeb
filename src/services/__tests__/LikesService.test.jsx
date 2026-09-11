// LikesService.test.jsx
import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../ApiService", () => ({
  default: { get: vi.fn(), post: vi.fn() },
}));

describe("LikesService", () => {
  let apiService, likesService;

  beforeEach(async () => {
    vi.resetModules();
    apiService = (await import("../ApiService")).default;
    likesService = (await import("../LikesService")).default;
    vi.clearAllMocks();
  });

  it("getAll calls GET /api/likes/", async () => {
    apiService.get.mockResolvedValue([]);
    const result = await likesService.getAll();
    expect(apiService.get).toHaveBeenCalledWith("/api/likes/");
    expect(result).toEqual([]);
  });

  it("toggle calls POST /api/likes/:id/toggle/", async () => {
    apiService.post.mockResolvedValue({ liked: true });
    const result = await likesService.toggle(42);
    expect(apiService.post).toHaveBeenCalledWith("/api/likes/42/toggle/");
    expect(result.liked).toBe(true);
  });
});
