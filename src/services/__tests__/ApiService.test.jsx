// ApiService.test.jsx
import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../ApiClient", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("ApiService", () => {
  let api, apiService;

  beforeEach(async () => {
    vi.resetModules();
    api = (await import("../ApiClient")).default;
    apiService = (await import("../ApiService")).default;
    vi.clearAllMocks();
  });

  it("get calls api.get and returns data", async () => {
    api.get.mockResolvedValue({ data: { id: 1 } });
    const result = await apiService.get("/api/test/");
    expect(api.get).toHaveBeenCalledWith("/api/test/");
    expect(result).toEqual({ id: 1 });
  });

  it("post calls api.post and returns data", async () => {
    api.post.mockResolvedValue({ data: { id: 2 } });
    const result = await apiService.post("/api/test/", { name: "x" });
    expect(api.post).toHaveBeenCalledWith("/api/test/", { name: "x" });
    expect(result).toEqual({ id: 2 });
  });

  it("put calls api.put and returns data", async () => {
    api.put.mockResolvedValue({ data: { id: 3 } });
    const result = await apiService.put("/api/test/1/", { name: "y" });
    expect(api.put).toHaveBeenCalledWith("/api/test/1/", { name: "y" });
    expect(result).toEqual({ id: 3 });
  });

  it("patch calls api.patch and returns data", async () => {
    api.patch.mockResolvedValue({ data: { name: "z" } });
    const result = await apiService.patch("/api/test/1/", { name: "z" });
    expect(api.patch).toHaveBeenCalledWith("/api/test/1/", { name: "z" });
    expect(result).toEqual({ name: "z" });
  });

  it("delete calls api.delete and returns data", async () => {
    api.delete.mockResolvedValue({ data: {} });
    const result = await apiService.delete("/api/test/1/");
    expect(api.delete).toHaveBeenCalledWith("/api/test/1/");
    expect(result).toEqual({});
  });
});
