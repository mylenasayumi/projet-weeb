// api.test.js
import { describe, it, expect } from "vitest";

import { API_BASE_URL } from "../api";

describe("API_BASE_URL", () => {
  it("falls back to localhost when VITE_API_URL is not set", () => {
    expect(typeof API_BASE_URL).toBe("string");
    expect(API_BASE_URL.length).toBeGreaterThan(0);
  });
});
