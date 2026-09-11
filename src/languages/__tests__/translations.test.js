// translations.test.js
import { describe, it, expect } from "vitest";

import en from "../en";
import fr from "../fr";
import { translations } from "../translations";

describe("translations", () => {
  it("en and fr have same keys", () => {
    expect(Object.keys(en)).toEqual(Object.keys(fr));
  });

  it("translations object contains both en and fr", () => {
    expect(translations.en).toBe(en);
    expect(translations.fr).toBe(fr);
  });
});
