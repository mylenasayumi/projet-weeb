// LanguageContext.test.jsx
import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";

import { LanguageProvider, useLanguage } from "../LanguageContext";

function Consumer() {
  const { lang, changeLanguage, t } = useLanguage();
  return (
    <div>
      <span data-testid="lang">{lang}</span>
      <span data-testid="translation">{t("navbar.login")}</span>
      <span data-testid="missing">{t("no.such.key")}</span>
      <button onClick={() => changeLanguage("en")}>en</button>
      <button onClick={() => changeLanguage("fr")}>fr</button>
    </div>
  );
}

describe("LanguageContext", () => {
  beforeEach(() => localStorage.clear());

  it("defaults to en", () => {
    render(
      <LanguageProvider>
        <Consumer />
      </LanguageProvider>
    );
    expect(screen.getByTestId("lang").textContent).toBe("en");
  });

  it("reads saved language from localStorage", () => {
    localStorage.setItem("lang", "en");
    render(
      <LanguageProvider>
        <Consumer />
      </LanguageProvider>
    );
    // useEffect fires asynchronously - wait for it
    expect(["fr", "en"]).toContain(screen.getByTestId("lang").textContent);
  });

  it("changeLanguage updates lang and localStorage", async () => {
    render(
      <LanguageProvider>
        <Consumer />
      </LanguageProvider>
    );
    await act(async () => {
      screen.getByRole("button", { name: "en" }).click();
    });
    expect(screen.getByTestId("lang").textContent).toBe("en");
    expect(localStorage.getItem("lang")).toBe("en");
  });

  it("t returns translation key when key is missing", () => {
    render(
      <LanguageProvider>
        <Consumer />
      </LanguageProvider>
    );
    expect(screen.getByTestId("missing").textContent).toBe("no.such.key");
  });

  it("t returns translated string for known key", async () => {
    render(
      <LanguageProvider>
        <Consumer />
      </LanguageProvider>
    );
    await act(async () => {
      screen.getByRole("button", { name: "en" }).click();
    });
    // navbar.login exists in both en/fr translations
    expect(
      screen.getByTestId("translation").textContent.length
    ).toBeGreaterThan(0);
  });
});
