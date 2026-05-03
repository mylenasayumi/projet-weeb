// translations.test.js
import { describe, it, expect } from "vitest";
import en from "../en";
import fr from "../fr";

describe("translations", () => {
    it("en and fr have same keys", () => {
        expect(Object.keys(en)).toEqual(Object.keys(fr));
    });
});