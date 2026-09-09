// UserDropdown.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";

import UserDropdown from "../UserDropdown";

vi.mock("../../../languages/LanguageContext", () => ({
  useLanguage: () => ({ t: (k) => k }),
}));

const user = { first_name: "Mylena", last_name: "Hamasaki" };

const renderComponent = (onLogout = vi.fn()) => {
  return render(
    <MemoryRouter>
      <UserDropdown user={user} onLogout={onLogout} />
    </MemoryRouter>
  );
};

describe("UserDropdown", () => {
  it("renders avatar with first letter", () => {
    renderComponent();
    expect(screen.getByText("M")).toBeInTheDocument();
  });

  it("opens dropdown on avatar click", () => {
    renderComponent();
    fireEvent.click(screen.getByText("M"));
    expect(screen.getByText("navbar.logout")).toBeInTheDocument();
    expect(screen.getByText("navbar.myProfile")).toBeInTheDocument();
  });

  it("calls onLogout when logout button is clicked", () => {
    const onLogout = vi.fn();
    renderComponent(onLogout);
    fireEvent.click(screen.getByText("M"));
    fireEvent.click(screen.getByText("navbar.logout"));
    expect(onLogout).toHaveBeenCalledTimes(1);
  });

  it("closes dropdown on outside click", () => {
    renderComponent();
    fireEvent.click(screen.getByText("M"));
    expect(screen.getByText("navbar.logout")).toBeInTheDocument();
    fireEvent.mouseDown(document.body);
    expect(screen.queryByText("navbar.logout")).not.toBeInTheDocument();
  });
});
