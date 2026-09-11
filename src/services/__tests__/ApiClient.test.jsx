import axios from "axios";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const mockApi = vi.fn();

const requestUse = vi.fn();
const responseUse = vi.fn();

vi.mock("axios", () => ({
  default: {
    create: vi.fn(),
    post: vi.fn(),
  },
}));

describe("ApiClient module", () => {
  let api;
  let requestSuccess;
  let requestError;
  let responseSuccess;
  let responseError;

  beforeEach(async () => {
    localStorage.clear();
    sessionStorage.clear();

    vi.resetModules();

    requestUse.mockReset();
    responseUse.mockReset();
    mockApi.mockReset();

    axios.create.mockReset();
    axios.post.mockReset();

    axios.create.mockImplementation(() => {
      mockApi.interceptors = {
        request: {
          use: requestUse,
        },
        response: {
          use: responseUse,
        },
      };

      return mockApi;
    });

    api = (await import("../ApiClient")).default;

    requestSuccess = requestUse.mock.calls[0]?.[0];
    requestError = requestUse.mock.calls[0]?.[1];

    responseSuccess = responseUse.mock.calls[0]?.[0];
    responseError = responseUse.mock.calls[0]?.[1];
  });

  afterEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  describe("module initialization", () => {
    it("creates an axios instance on import", () => {
      expect(api).toBeDefined();

      expect(axios.create).toHaveBeenCalledWith(
        expect.objectContaining({
          baseURL: expect.anything(),
          withCredentials: true,
        })
      );
    });

    it("registers a request interceptor", () => {
      expect(requestUse).toHaveBeenCalledTimes(1);

      expect(requestSuccess).toEqual(expect.any(Function));

      expect(requestError).toEqual(expect.any(Function));
    });

    it("registers a response interceptor", () => {
      expect(responseUse).toHaveBeenCalledTimes(1);

      expect(responseSuccess).toEqual(expect.any(Function));

      expect(responseError).toEqual(expect.any(Function));
    });
  });

  describe("request interceptor", () => {
    it("adds Authorization header when token exists", () => {
      localStorage.setItem("access_token", "my-token");

      const config = {
        headers: {},
      };

      const result = requestSuccess(config);

      expect(result).toBe(config);

      expect(result.headers.Authorization).toBe("Bearer my-token");
    });

    it("does not add Authorization when no token", () => {
      localStorage.removeItem("access_token");

      const config = {
        headers: {},
      };

      const result = requestSuccess(config);

      expect(result).toBe(config);

      expect(result.headers.Authorization).toBeUndefined();
    });

    it("creates headers when headers are missing", () => {
      localStorage.setItem("access_token", "my-token");

      const config = {};

      const result = requestSuccess(config);

      expect(result.headers).toEqual({
        Authorization: "Bearer my-token",
      });
    });

    it("rejects errors in request interceptor", async () => {
      const error = new Error("req error");

      await expect(requestError(error)).rejects.toThrow("req error");
    });
  });

  describe("response interceptor", () => {
    it("passes through successful responses", () => {
      const response = {
        data: "ok",
        config: {
          url: "/some/endpoint",
        },
      };

      expect(responseSuccess(response)).toBe(response);
    });

    it("rejects immediately when force_logout is set", async () => {
      sessionStorage.setItem("force_logout", "true");

      const error = {
        response: {
          status: 401,
        },
        config: {
          url: "/api/data/",
          _retry: false,
        },
      };

      await expect(responseError(error)).rejects.toBe(error);
    });

    it("rejects non-401 errors directly", async () => {
      const error = {
        response: {
          status: 500,
        },
        config: {
          url: "/api/data/",
          _retry: false,
        },
      };

      await expect(responseError(error)).rejects.toBe(error);
    });

    it("rejects 401 on refresh endpoint directly", async () => {
      const error = {
        response: {
          status: 401,
        },
        config: {
          url: "/api/auth/token/refresh/",
          _retry: false,
        },
      };

      await expect(responseError(error)).rejects.toBe(error);

      expect(axios.post).not.toHaveBeenCalled();
    });

    it("rejects 401 on login endpoint directly", async () => {
      const error = {
        response: {
          status: 401,
        },
        config: {
          url: "/api/auth/token/",
          _retry: false,
        },
      };

      await expect(responseError(error)).rejects.toBe(error);

      expect(axios.post).not.toHaveBeenCalled();
    });

    it("rejects 401 on logout endpoint directly", async () => {
      const error = {
        response: {
          status: 401,
        },
        config: {
          url: "/api/auth/logout/",
          _retry: false,
        },
      };

      await expect(responseError(error)).rejects.toBe(error);

      expect(axios.post).not.toHaveBeenCalled();
    });

    it("rejects 401 when the request was already retried", async () => {
      const error = {
        response: {
          status: 401,
        },
        config: {
          url: "/api/data/",
          _retry: true,
        },
      };

      await expect(responseError(error)).rejects.toBe(error);

      expect(axios.post).not.toHaveBeenCalled();
    });

    it("refreshes token on 401 and retries the original request", async () => {
      axios.post.mockResolvedValueOnce({
        data: {
          access: "new-token",
        },
      });

      mockApi.mockResolvedValueOnce({
        data: "retried-response",
      });

      const originalRequest = {
        url: "/api/data/",
        headers: {},
        _retry: false,
      };

      const error = {
        response: {
          status: 401,
        },
        config: originalRequest,
      };

      const result = await responseError(error);

      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining("/api/auth/token/refresh/"),
        {},
        {
          withCredentials: true,
        }
      );

      expect(localStorage.getItem("access_token")).toBe("new-token");

      expect(originalRequest.headers.Authorization).toBe("Bearer new-token");

      expect(originalRequest._retry).toBe(true);

      expect(mockApi).toHaveBeenCalledWith(originalRequest);

      expect(result).toEqual({
        data: "retried-response",
      });
    });

    it("clears tokens when refresh fails", async () => {
      localStorage.setItem("access_token", "old-token");

      localStorage.setItem("user", '{"id":1}');

      const refreshError = new Error("refresh failed");

      axios.post.mockRejectedValueOnce(refreshError);

      const originalRequest = {
        url: "/api/data/",
        headers: {},
        _retry: false,
      };

      const error = {
        response: {
          status: 401,
        },
        config: originalRequest,
      };

      await expect(responseError(error)).rejects.toThrow("refresh failed");

      expect(localStorage.getItem("access_token")).toBeNull();

      expect(localStorage.getItem("user")).toBeNull();

      expect(mockApi).not.toHaveBeenCalled();
    });
  });
});
