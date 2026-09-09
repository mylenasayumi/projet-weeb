// SatisfactionService.test.jsx
import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../ApiService", () => ({
  default: { post: vi.fn() },
}));

describe("SatisfactionService", () => {
  let apiService, satisfactionService;

  beforeEach(async () => {
    vi.resetModules();
    apiService = (await import("../ApiService")).default;
    satisfactionService = (await import("../SatisfactionService")).default;
    vi.clearAllMocks();
  });

  it("create calls POST /api/satisfactions/", async () => {
    apiService.post.mockResolvedValue({ id: 1, polarity: true });
    const data = {
      description: "Great!",
      email: "a@b.com",
      first_name: "A",
      last_name: "B",
    };
    const result = await satisfactionService.create(data);
    expect(apiService.post).toHaveBeenCalledWith("/api/satisfactions/", data);
    expect(result.polarity).toBe(true);
  });
});
