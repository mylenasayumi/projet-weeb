// getApiErrorMessage.test.jsx
import { describe, it, expect } from "vitest";

import { getApiErrorMessage } from "../getApiErrorMessage";

describe("getApiErrorMessage", () => {
  it("returns detail when present", () => {
    expect(
      getApiErrorMessage(
        { response: { data: { detail: "Not found" } } },
        "fallback"
      )
    ).toBe("Not found");
  });

  it("returns error field when no detail", () => {
    expect(
      getApiErrorMessage(
        { response: { data: { error: "Bad request" } } },
        "fallback"
      )
    ).toBe("Bad request");
  });

  it("returns email[0] when no detail or error", () => {
    expect(
      getApiErrorMessage(
        { response: { data: { email: ["Email taken"] } } },
        "fallback"
      )
    ).toBe("Email taken");
  });

  it("returns password[0] when only password error", () => {
    expect(
      getApiErrorMessage(
        { response: { data: { password: ["Too short"] } } },
        "fallback"
      )
    ).toBe("Too short");
  });

  it("returns fallback when no known field", () => {
    expect(getApiErrorMessage({ response: { data: {} } }, "fallback")).toBe(
      "fallback"
    );
  });

  it("returns fallback when response is undefined", () => {
    expect(getApiErrorMessage({}, "fallback")).toBe("fallback");
  });
});
