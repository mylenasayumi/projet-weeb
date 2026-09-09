// Pagination.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import Pagination from "../Pagination";

vi.mock("../../../languages/LanguageContext", () => ({
  useLanguage: () => ({ t: (k) => k }),
}));

describe("Pagination", () => {
  it("renders page info", () => {
    render(
      <Pagination
        page={2}
        totalPages={5}
        onPreviousPage={vi.fn()}
        onNextPage={vi.fn()}
      />
    );
    expect(screen.getByText(/2 \/ 5/)).toBeInTheDocument();
  });

  it("disables previous button on first page", () => {
    render(
      <Pagination
        page={1}
        totalPages={3}
        onPreviousPage={vi.fn()}
        onNextPage={vi.fn()}
      />
    );
    const [prev] = screen.getAllByRole("button");
    expect(prev).toBeDisabled();
  });

  it("disables next button on last page", () => {
    render(
      <Pagination
        page={3}
        totalPages={3}
        onPreviousPage={vi.fn()}
        onNextPage={vi.fn()}
      />
    );
    const buttons = screen.getAllByRole("button");
    expect(buttons[buttons.length - 1]).toBeDisabled();
  });

  it("calls onPreviousPage when prev clicked", () => {
    const onPrev = vi.fn();
    render(
      <Pagination
        page={2}
        totalPages={3}
        onPreviousPage={onPrev}
        onNextPage={vi.fn()}
      />
    );
    fireEvent.click(screen.getAllByRole("button")[0]);
    expect(onPrev).toHaveBeenCalled();
  });

  it("calls onNextPage when next clicked", () => {
    const onNext = vi.fn();
    render(
      <Pagination
        page={1}
        totalPages={3}
        onPreviousPage={vi.fn()}
        onNextPage={onNext}
      />
    );
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[buttons.length - 1]);
    expect(onNext).toHaveBeenCalled();
  });
});
