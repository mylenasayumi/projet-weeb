// ArticlesService.test.jsx
import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../ApiService", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("ArticlesService", () => {
  let apiService, articleService;

  beforeEach(async () => {
    vi.resetModules();
    apiService = (await import("../ApiService")).default;
    articleService = (await import("../ArticlesService")).default;
    vi.clearAllMocks();
  });

  it("getAll without params calls /api/articles/", async () => {
    apiService.get.mockResolvedValue({ results: [], count: 0 });
    await articleService.getAll();
    expect(apiService.get).toHaveBeenCalledWith("/api/articles/");
  });

  it("getAll with params builds query string", async () => {
    apiService.get.mockResolvedValue({ results: [], count: 0 });
    await articleService.getAll({ page: 2, ordering: "title" });
    expect(apiService.get).toHaveBeenCalledWith(
      expect.stringContaining("page=2")
    );
    expect(apiService.get).toHaveBeenCalledWith(
      expect.stringContaining("ordering=title")
    );
  });

  it("getAll filters out null/empty params", async () => {
    apiService.get.mockResolvedValue({ results: [], count: 0 });
    await articleService.getAll({ page: 1, search: "", ordering: null });
    // only page=1 should remain
    const call = apiService.get.mock.calls[0][0];
    expect(call).not.toContain("search");
    expect(call).not.toContain("ordering");
  });

  it("getFromUrl delegates to apiService.get", async () => {
    apiService.get.mockResolvedValue({ results: [] });
    await articleService.getFromUrl("/api/articles/?page=2");
    expect(apiService.get).toHaveBeenCalledWith("/api/articles/?page=2");
  });

  it("getById calls /api/articles/:id/", async () => {
    apiService.get.mockResolvedValue({ id: 1 });
    const result = await articleService.getById(1);
    expect(apiService.get).toHaveBeenCalledWith("/api/articles/1/");
    expect(result.id).toBe(1);
  });

  it("create calls POST /api/articles/", async () => {
    apiService.post.mockResolvedValue({ id: 10 });
    const result = await articleService.create({
      title: "T",
      description: "D",
    });
    expect(apiService.post).toHaveBeenCalledWith("/api/articles/", {
      title: "T",
      description: "D",
    });
    expect(result.id).toBe(10);
  });

  it("update calls PUT /api/articles/:id/", async () => {
    apiService.put.mockResolvedValue({ id: 1, title: "Updated" });
    await articleService.update(1, { title: "Updated", description: "D" });
    expect(apiService.put).toHaveBeenCalledWith("/api/articles/1/", {
      title: "Updated",
      description: "D",
    });
  });

  it("partialUpdate calls PATCH /api/articles/:id/", async () => {
    apiService.patch.mockResolvedValue({ id: 1 });
    await articleService.partialUpdate(1, { title: "Partial" });
    expect(apiService.patch).toHaveBeenCalledWith("/api/articles/1/", {
      title: "Partial",
    });
  });

  it("delete calls DELETE /api/articles/:id/", async () => {
    apiService.delete.mockResolvedValue({});
    await articleService.delete(5);
    expect(apiService.delete).toHaveBeenCalledWith("/api/articles/5/");
  });
});
